"use server";

import { LoansListSchema } from "../zod/zod-loans-list";

export const createLoansList = async (
  prevState: unknown,
  formData: FormData,
) => {
  const validatedFields = LoansListSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, tools, loan_date, return_date, status } = validatedFields.data;

  console.log({ email, tools, loan_date, return_date, status });

  return { success: true, message: "Loans created successfully" };
};

export const updateLoansList = async (
  prevState: unknown,
  formData: FormData,
) => {
  const validatedFields = LoansListSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, tools, loan_date, return_date, status } = validatedFields.data;

  console.log({ email, tools, loan_date, return_date, status });

  return { success: true, message: "Loans updated successfully" };
};
