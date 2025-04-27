import ContainerSearchForm from "@/components/container/container-search-form";
import DialogCreateTools from "@/components/dialog/dialog-create-tools";
import { DataTable } from "@/components/table/data-table";
import TablePagination from "@/components/table/table-pagination";
import { toolsColumns } from "@/components/table/tools/tools-columns";
import { getAllTools } from "@/lib/actions/actions-tools";
import { TOOLS_CATEGORIES } from "@/lib/data";
import { notFound } from "next/navigation";

const AdminToolsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, search = "", category = "" } = await searchParams;
  const p = page ? parseInt(page) : 1;

  if (p === 0) return notFound();

  const tools = await getAllTools(p, search, category, "all");

  return (
    <div>
      <ContainerSearchForm categoriesData={TOOLS_CATEGORIES}>
        <DialogCreateTools />
      </ContainerSearchForm>
      <DataTable columns={toolsColumns} data={tools?.data ?? []} />
      <TablePagination currentPage={p} count={tools?.count ?? 0} />
    </div>
  );
};

export default AdminToolsPage;
