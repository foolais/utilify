import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();

  if (!user) {
    console.error("No admin user found, please create one first.");
    return;
  }

  const statuses = ["available", "unavailable", "pending", "borrowed"] as const;
  const categories = ["hardware", "software", "accessory"] as const;

  const tools = Array.from({ length: 15 }).map((_, index) => ({
    name: `Tool ${index + 1}`,
    description: `Description for Tool ${index + 1}`,
    category: categories[index % categories.length],
    status: statuses[index % statuses.length],
    created_by: user.id,
    updated_by: user.id,
  }));

  await prisma.tool.createMany({
    data: tools,
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
