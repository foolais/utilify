"use server";

import { LoginSchema, RegisterSchema } from "@/lib/zod/zod-auth";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { signIn } from "../../../auth";
import { AuthError } from "next-auth";

export const registerCredentials = async (
  prevState: unknown,
  formData: FormData,
) => {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return {
      message: "Email is already taken.",
      error: { email: ["Email is already taken."] },
    };
  }

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

export const loginCredentials = async (
  prevState: unknown,
  formData: FormData,
) => {
  const validatedFields = LoginSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: { auth: ["User not found"] } };
  const redirectUrl =
    user?.role === "admin" ? "/admin/dashboard" : "/dashboard";

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.name) {
        case "CredentialsSignin":
          return { error: true, message: "Invalid email or password" };
        default:
          return { error: true, message: "Authentication failed" };
      }
    }
    throw error;
  }
};
