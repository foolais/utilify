"use server";

import { RegisterSchema } from "@/lib/zod/zod-auth";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";

export const registerCredentials = async (
  prevState: unknown,
  formData: FormData,
) => {
  const validateFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validateFields.data;
  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error(error);
    return { message: "Failed to create user" };
  }
};
