"use server";

import { LoanStatus, TargetType } from "@prisma/client";
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
    const [loansCreated, toolsCreated] = await prisma.$transaction([
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

    await prisma.auditLog.createMany({
      data: [
        {
          userId: session?.user?.id ?? "",
          action: `Created loan for ${toolsCreated.name}`,
          targetid: loansCreated.id,
          targetType: TargetType.LOAN,
        },
        {
          userId: session?.user?.id ?? "",
          action: `Auto Updated status of tool ${toolsCreated.name} to ${toolsStatus}`,
          targetid: toolsCreated.id,
          targetType: TargetType.TOOL,
        },
      ],
    });

    revalidatePath(`/admin/loans-list`);
    return { success: true, message: "Loan created successfully" };
  } catch (error) {
    console.log({ error });
    return { error: { error: [error] } };
  }
};

export const updateLoansList = async (
  id: string,
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
  const toolsData = await prisma.tool.findUnique({ where: { id: tools } });
  if (!toolsData) return { error: { notFound: ["Tool not found"] } };

  const pendingLoanStatus = status === "pennding";
  const borrowedLoanStatus = status === "borrowed" || status === "overdue";

  const toolStatus = pendingLoanStatus
    ? "pending"
    : borrowedLoanStatus
      ? "borrowed"
      : "available";

  try {
    if (
      toolsData.status === "available" ||
      (toolsData.status === "borrowed" && status === "returned")
    ) {
      const [loanUpdate, toolUpdate] = await prisma.$transaction([
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

      await prisma.auditLog.createMany({
        data: [
          {
            userId: session?.user?.id ?? "",
            action: `Updated loan for tool ${toolsData.name}`,
            targetid: loanUpdate.id,
            targetType: TargetType.LOAN,
          },
          {
            userId: session?.user?.id ?? "",
            action: `Auto Updated status of tool ${toolsData.name} to ${toolStatus}`,
            targetid: toolUpdate.id,
            targetType: TargetType.TOOL,
          },
        ],
      });
    } else {
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
      await prisma.auditLog.create({
        data: {
          userId: session?.user?.id ?? "",
          action: `Updated loan for ${toolsData.name}`,
          targetid: id,
          targetType: TargetType.LOAN,
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

export const deleteLoansList = async (id: string, toolName: string) => {
  const session = await auth();
  if (!session) return { error: { auth: ["User not found"] } };

  try {
    await prisma.$transaction([
      prisma.loan.delete({
        where: { id },
      }),
      prisma.auditLog.create({
        data: {
          userId: session?.user?.id ?? "",
          action: `Deleted loan for ${toolName}`,
          targetid: id,
          targetType: TargetType.LOAN,
        },
      }),
    ]);

    revalidatePath(`/admin/loans-list`);

    return { success: true, message: "Loan deleted successfully" };
  } catch (error) {
    console.log({ error });
    return { error: { error: [error] } };
  }
};
