"use server";

import { ToolStatus } from "@prisma/client";
import { auth } from "../../../auth";
import { prisma } from "../prisma";
import { ToolsSchema } from "../zod/zod-tools";
import { revalidatePath } from "next/cache";

export const getAllTools = async () => {
  const session = await auth();
  if (!session) return { error: { auth: ["You must be logged in"] } };

  const tools = await prisma.tool.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      status: true,
      created_by: true,
      createdBy: { select: { id: true, name: true } },
      updated_by: true,
      updatedBy: { select: { id: true, name: true } },
      createdAt: true,
      updatedAt: true,
    },
  });

  const data = tools.map((tool, index) => ({
    no: index + 1,
    ...tool,
    description: tool.description || "",
  }));
  return { data };
};

export const getToolById = async (id: string) => {
  const session = await auth();
  if (!session) return { error: { auth: ["You must be logged in"] } };

  try {
    const tool = await prisma.tool.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        status: true,
        created_by: true,
        createdBy: { select: { id: true, name: true } },
        updated_by: true,
        updatedBy: { select: { id: true, name: true } },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!tool) return { error: { notFound: ["Tool not found"] } };

    return tool;
  } catch (error) {
    console.log({ error });
    return {
      error: { general: ["An error occurred while fetching the tool"] },
    };
  }
};

export const createTools = async (prevState: unknown, formData: FormData) => {
  const session = await auth();
  if (!session) return { error: { auth: ["You must be logged in"] } };

  const validatedFields = ToolsSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

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

    revalidatePath(`/admin/tools`);

    return { success: true, message: "Tools created successfully" };
  } catch (error) {
    console.log({ error });
    return { error: { error: [error] } };
  }
};

export const updateTools = async (
  id: string,
  prevState: unknown,
  formData: FormData,
) => {
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

  console.log({ name, description, category, status });

  try {
    await prisma.tool.update({
      where: { id },
      data: {
        name,
        description: description || "",
        category,
        status: status as ToolStatus,
        created_by: session?.user?.id ?? "",
        updated_by: session?.user?.id ?? "",
      },
    });

    revalidatePath(`/admin/tools`);

    return { success: true, message: "Tools updated successfully" };
  } catch (error) {
    console.log({ error });
    return { error: { error: [error] } };
  }
};
