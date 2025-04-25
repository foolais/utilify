"use server";

import { ToolsSchema } from "../zod/zod-tools";

export const createTools = async (prevState: unknown, formData: FormData) => {
  const validatedFields = ToolsSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, category, status } = validatedFields.data;

  console.log({ name, description, category, status });

  return { success: true, message: "Tools created successfully" };
};
