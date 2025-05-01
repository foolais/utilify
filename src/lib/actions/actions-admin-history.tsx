"use server";

import { TargetType } from "@prisma/client";
import { auth } from "../../../auth";
import { ITEM_PER_PAGE } from "../data";
import { prisma } from "../prisma";

export const getAllAdminHistory = async (
  currentPage: number,
  search: string,
  category?: TargetType,
) => {
  const session = await auth();
  if (!session) return { error: { auth: ["You must be logged in"] } };

  const pageSize = ITEM_PER_PAGE;

  try {
    const [histories, count] = await prisma.$transaction([
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          userId: session.user.id,
          action: { contains: search, mode: "insensitive" },
          ...(category ? { targetType: category } : {}),
        },
        select: {
          id: true,
          action: true,
          targetType: true,
          createdAt: true,
        },
        take: pageSize,
        skip: pageSize * (currentPage - 1),
      }),
      prisma.auditLog.count({
        where: {
          userId: session.user.id,
          action: { contains: search, mode: "insensitive" },
        },
      }),
    ]);

    const data = histories.map((history, index) => ({
      no: (currentPage - 1) * pageSize + (index + 1),
      ...history,
    }));

    return { data, count };
  } catch (error) {
    console.log({ error });
    return { error: { error: [error] } };
  }
};
