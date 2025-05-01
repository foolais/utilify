import { PrismaClient, TargetType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();

  if (!user) {
    console.error("No admin user found, please create one first.");
    return;
  }

  const statuses = ["available", "unavailable", "pending", "borrowed"] as const;
  // const statuses = ["available"] as const;
  const categories = ["hardware", "software", "accessory"] as const;

  const tools = Array.from({ length: 5 }).map((_, index) => ({
    name: `Tool ${index + 50}`,
    description: `Description for Tool ${index + 1}`,
    category: categories[index % categories.length],
    status: statuses[index % statuses.length],
    created_by: user.id,
    updated_by: user.id,
  }));

  // First, create the tools
  const createdTools = await prisma.$transaction(
    tools.map((tool) => prisma.tool.create({ data: tool })),
  );

  // Then create audit logs for each tool creation
  const auditLogs = createdTools.map((tool) => ({
    userId: user.id,
    action: `Created tool ${tool.name}`,
    targetid: tool.id,
    targetType: TargetType.TOOL,
  }));

  await prisma.auditLog.createMany({
    data: auditLogs,
  });

  console.log("Seeding 15 tools complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
