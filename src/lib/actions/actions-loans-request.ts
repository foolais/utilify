"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import { LoansRequestSchema } from "../zod/zod-loans-request";
import { prisma } from "../prisma";

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
