import ContainerSearchForm from "@/components/container/container-search-form";
import DialogCreateTools from "@/components/dialog/dialog-create-tools";
import { TableLoadingSkeleton } from "@/components/skeleton/loading-skeleton";
import { DataTable } from "@/components/table/data-table";
import TablePagination from "@/components/table/table-pagination";
import { toolsColumns } from "@/components/table/tools/tools-columns";
import { getAllTools } from "@/lib/actions/actions-tools";
import { TOOLS_CATEGORIES } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Tools List | Utilify App",
  description: "Utilify App Tools List for admin",
};

const AdminToolsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, search = "", category = "" } = await searchParams;
  const p = page ? parseInt(page) : 1;

  if (p === 0) return notFound();

  const toolsPromise = getAllTools(p, search, category, "all");

  return (
    <div>
      <ContainerSearchForm categoriesData={TOOLS_CATEGORIES}>
        <DialogCreateTools />
      </ContainerSearchForm>
      <Suspense fallback={<TableLoadingSkeleton />}>
        <DataTableWrapper toolsPromise={toolsPromise} page={p} />
      </Suspense>
    </div>
  );
};

async function DataTableWrapper({
  toolsPromise,
  page,
}: {
  toolsPromise: ReturnType<typeof getAllTools>;
  page: number;
}) {
  const tools = await toolsPromise;

  return (
    <>
      <DataTable columns={toolsColumns} data={tools?.data ?? []} />
      <TablePagination currentPage={page} count={tools?.count ?? 0} />
    </>
  );
}

export default AdminToolsPage;
