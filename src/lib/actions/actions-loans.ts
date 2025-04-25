"use server";

import { LoansSchema } from "../zod/zod-loans";

export const createLoans = async (prevState: unknown, formData: FormData) => {
  const validatedFields = LoansSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, tools, loan_date, return_date, status } = validatedFields.data;

  console.log({ email, tools, loan_date, return_date, status });

  return { success: true, message: "Tools created successfully" };
};
