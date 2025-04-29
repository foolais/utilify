"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import { LoansRequestSchema } from "../zod/zod-loans-request";
import { prisma } from "../prisma";
import { ITEM_PER_PAGE } from "../data";
import { LoanStatus } from "@prisma/client";

export const getAllLoansRequest = async (
  currentPage: number,
  search: string,
  status?: LoanStatus | undefined,
  isExcludePending?: boolean,
) => {
  const session = await auth();
  if (!session) return { error: { auth: ["You must be logged in"] } };

  const pageSize = ITEM_PER_PAGE;
  const email = session?.user?.email ?? "";
  const isAdmin = session?.user?.role === "admin";

  // find all loans
  const allLoans = await prisma.loan.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      ...(isAdmin ? {} : { created_by: email, email }),
      ...(status
        ? { status }
        : isExcludePending
          ? { status: { not: "pending" } }
          : {}),
      tool: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    },
    select: {
      id: true,
      return_date: true,
      status: true,
      tool: { select: { id: true } },
    },
    take: pageSize,
    skip: pageSize * (currentPage - 1),
  });

  const now = new Date();

  // Auto reject if return_date < now and status is pending
  const loansToReject = allLoans.filter((loan) => {
    return (
      loan.return_date &&
      new Date(loan.return_date) < now &&
      loan.status === "pending"
    );
  });

  if (loansToReject.length > 0) {
    try {
      const rejectPromises = loansToReject.map((loan) =>
        prisma.loan.update({
          where: { id: loan.id },
          data: { status: "rejected" },
        }),
      );
      const resultsReject = await Promise.all(rejectPromises);
      console.log(`Updated ${resultsReject.length} loans to reject status`);
      const setToolsAvailable = loansToReject.map((loan) =>
        prisma.tool.update({
          where: { id: loan.tool.id },
          data: { status: "available" },
        }),
      );
      const resultsAvail = await Promise.all(setToolsAvailable);
      console.log(`Updated ${resultsAvail.length} tools to available status`);
    } catch (error) {
      console.error("Error updating reject loans:", error);
    }
  }

  // update loans to overdue if return_date < now and status is borrowed
  const loansToOverdue = allLoans.filter((loan) => {
    return (
      loan.return_date &&
      new Date(loan.return_date) < now &&
      loan.status === "borrowed"
    );
  });

  if (loansToOverdue.length > 0) {
    try {
      const overduePromises = loansToOverdue.map((loan) =>
        prisma.loan.update({
          where: { id: loan.id },
          data: { status: "overdue" },
        }),
      );

      const results = await Promise.all(overduePromises);
      console.log(`Updated ${results.length} loans to overdue status`);
    } catch (error) {
      console.error("Error updating overdue loans:", error);
    }
  }

  // uptodate loans
  const [loans, count] = await prisma.$transaction([
    prisma.loan.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        ...(isAdmin ? {} : { created_by: email, email }),
        tool: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        ...(status ? { status } : {}),
      },
      select: {
        id: true,
        email: true,
        toolId: true,
        tool: { select: { name: true, category: true } },
        return_date: true,
        loan_date: true,
        status: true,
        created_by: true,
        createdBy: { select: { id: true, name: true } },
        updated_by: true,
        updatedBy: { select: { id: true, name: true } },
        createdAt: true,
        updatedAt: true,
      },
      take: pageSize,
      skip: pageSize * (currentPage - 1),
    }),
    prisma.loan.count({
      where: {
        ...(isAdmin ? {} : { created_by: email, email }),
        tool: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        ...(status ? { status } : {}),
      },
    }),
  ]);

  const data = loans.map((loan, index) => ({
    no: (currentPage - 1) * pageSize + (index + 1),
    tools: loan.tool.name,
    ...loan,
  }));

  return { data, count };
};

export const createLoanRequest = async (
  id: string,
  prevState: unknown,
  formData: FormData,
) => {
  const validatedFields = LoansRequestSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session) return { error: { auth: ["User not found"] } };

  const { return_date } = validatedFields.data;

  const payload = {
    email: session?.user?.email ?? "",
    toolId: id,
    status: "pending" as const,
    loan_date: new Date(),
    return_date: new Date(return_date),
    created_by: session?.user?.id ?? "",
    updated_by: session?.user?.id ?? "",
  };

  try {
    await prisma.$transaction([
      prisma.loan.create({
        data: payload,
      }),
      prisma.tool.update({
        where: { id },
        data: {
          status: "pending" as const,
        },
      }),
    ]);

    revalidatePath(`/dashboard`);
    return { success: true, message: "Loan request created successfully" };
  } catch (error) {
    console.log({ error });
    return { error: { error: [error] } };
  }
};

export const updateLoanRequest = async (
  type: "accept" | "reject",
  loanId: string,
  loanToolId: string,
) => {
  const session = await auth();
  if (!session) return { error: { auth: ["User not found"] } };

  try {
    await prisma.$transaction([
      prisma.tool.update({
        data: {
          status: type === "accept" ? "borrowed" : "available",
          updated_by: session?.user?.id ?? "",
        },
        where: { id: loanToolId },
      }),
      prisma.loan.update({
        data: {
          status: type === "accept" ? "borrowed" : "rejected",
          updated_by: session?.user?.id ?? "",
        },
        where: { id: loanId },
      }),
    ]);

    revalidatePath(`/admin/loans-request`);
    return {
      success: true,
      message: `Loan request ${type === "accept" ? "accepted" : "rejected"}`,
    };
  } catch (error) {
    console.log({ error });
    return { error: { error: [error] } };
  }
};
