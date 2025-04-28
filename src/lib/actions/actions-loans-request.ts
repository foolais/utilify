"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import { LoansRequestSchema } from "../zod/zod-loans-request";
import { prisma } from "../prisma";
import { ITEM_PER_PAGE } from "../data";
import { LoanStatus } from "@prisma/client";

export const getAllLoansRequestById = async (
  currentPage: number,
  search: string,
  status: LoanStatus,
) => {
  const session = await auth();
  if (!session) return { error: { auth: ["You must be logged in"] } };

  const pageSize = ITEM_PER_PAGE;

  const [loans, count] = await prisma.$transaction([
    prisma.loan.findMany({
      where: {
        email: session?.user?.email ?? "",
        tool: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        status: status,
      },
      select: {
        id: true,
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
    prisma.loan.count(),
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
