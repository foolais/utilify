import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/zod/zod-auth";
import { compareSync } from "bcrypt-ts";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 12 * 60 * 60 },
  pages: { signIn: "/auth" },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validateFields = LoginSchema.safeParse(credentials);

        if (!validateFields.success) return null;

        const { email, password } = validateFields.data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) throw new Error("User not found");

        const isMatchedPassword = compareSync(password, user.password);

        if (!isMatchedPassword) throw new Error("Invalid email or password");

        return { ...user, password: undefined };
      },
    }),
  ],
});
