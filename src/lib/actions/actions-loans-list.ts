"use server";

import { LoanStatus } from "@prisma/client";
import { auth } from "../../../auth";
import { prisma } from "../prisma";
import { LoansListSchema } from "../zod/zod-loans-list";
import { revalidatePath } from "next/cache";

export const getLoansById = async (id: string) => {
  const session = await auth();
  if (!session) return { error: { auth: ["You must be logged in"] } };

  try {
    const loan = await prisma.loan.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        toolId: true,
        tool: { select: { id: true, name: true, status: true } },
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
    });

    if (!loan) return { error: { notFound: ["Loan not found"] } };

    return loan;
  } catch (error) {
    console.log({ error });
    return {
      error: { general: ["An error occurred while fetching the loan"] },
    };
  }
};

export const createLoansList = async (
  prevState: unknown,
  formData: FormData,
) => {
  const validatedFields = LoansListSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  const session = await auth();
  if (!session) return { error: { auth: ["User not found"] } };

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, tools, loan_date, return_date, status } = validatedFields.data;

  const toolsStatus =
    status === "pending"
      ? "pending"
      : status === "borrowed"
        ? "borrowed"
        : "available";

  const payload = {
    email,
    toolId: tools,
    loan_date: new Date(loan_date),
    return_date: new Date(return_date),
    status: status as LoanStatus,
    created_by: session?.user?.id ?? "",
    updated_by: session?.user?.id ?? "",
  };

  try {
    await prisma.$transaction([
      prisma.loan.create({
        data: payload,
      }),
      prisma.tool.update({
        where: { id: tools },
        data: {
          status: toolsStatus,
        },
      }),
    ]);

    revalidatePath(`/admin/loans-list`);
    return { success: true, message: "Loan created successfully" };
  } catch (error) {
    console.log({ error });
    return { error: { error: [error] } };
  }
};

export const updateLoansList = async (
  id: string,
  isAvailableTools: boolean,
  prevState: unknown,
  formData: FormData,
) => {
  const session = await auth();
  if (!session) return { error: { auth: ["User not found"] } };

  const validatedFields = LoansListSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, tools, loan_date, return_date, status } = validatedFields.data;

  const pendingLoanStatus = status === "pennding";
  const borrowedLoanStatus = status === "borrowed" || status === "overdue";

  const toolStatus = pendingLoanStatus
    ? "pending"
    : borrowedLoanStatus
      ? "borrowed"
      : "available";

  try {
    if (isAvailableTools) {
      await prisma.$transaction([
        prisma.loan.update({
          where: { id },
          data: {
            email,
            toolId: tools,
            loan_date: new Date(loan_date),
            return_date: new Date(return_date),
            status: status as LoanStatus,
            updated_by: session?.user?.id ?? "",
          },
        }),
        prisma.tool.update({
          where: { id: tools },
          data: {
            status: toolStatus,
          },
        }),
      ]);
    } else if (!isAvailableTools) {
      await prisma.loan.update({
        where: { id },
        data: {
          email,
          toolId: tools,
          loan_date: new Date(loan_date),
          return_date: new Date(return_date),
          status: status as LoanStatus,
          updated_by: session?.user?.id ?? "",
        },
      });
    }

    revalidatePath(`/admin/loans-list`);
    return { success: true, message: "Loans updated successfully" };
  } catch (error) {
    console.log({ error });
    return { error: { error: [error] } };
  }
};

export const deleteLoansList = async (id: string) => {
  const session = await auth();
  if (!session) return { error: { auth: ["User not found"] } };

  try {
    await prisma.loan.delete({
      where: { id },
    });

    revalidatePath(`/admin/loans-list`);

    return { success: true, message: "Loan deleted successfully" };
  } catch (error) {
    console.log({ error });
    return { error: { error: [error] } };
  }
};
