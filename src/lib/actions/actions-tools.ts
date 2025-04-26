"use server";

import { ToolStatus } from "@prisma/client";
import { auth } from "../../../auth";
import { prisma } from "../prisma";
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

  const session = await auth();
  if (!session) return { error: { auth: ["User not found"] } };

  const { name, description, category, status } = validatedFields.data;

  try {
    await prisma.tool.create({
      data: {
        name,
        description: description || "",
        category,
        status: status as ToolStatus,
        created_by: session?.user?.id ?? "",
        updated_by: session?.user?.id ?? "",
      },
    });

    return { success: true, message: "Tools created successfully" };
  } catch (error) {
    console.log({ error });
    return { error: { error: [error] } };
  }
};

export const updateTools = async (prevState: unknown, formData: FormData) => {
  const validatedFields = ToolsSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session) return { error: { auth: ["User not found"] } };

  const { name, description, category, status } = validatedFields.data;

  console.log({ name, description, category, status, session });
};
