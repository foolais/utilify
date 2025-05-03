"use server";

import { auth } from "../../../auth";
import { prisma } from "../prisma";

export const getDashboardData = async () => {
  const session = await auth();
  if (!session) return { error: { auth: ["You must be logged in"] } };

  try {
    const [auditLogs, toolCount, loanRequestCount, loanListCount] =
      await prisma.$transaction([
        prisma.auditLog.findMany({
          orderBy: { createdAt: "desc" },
          take: 3,
        }),
        prisma.tool.count(),
        prisma.loan.count({ where: { status: "pending" } }),
        prisma.loan.count(),
      ]);

    return { auditLogs, toolCount, loanRequestCount, loanListCount };
  } catch (error) {
    return { error: { error: [error] } };
  }
};
