import ContainerSearchForm from "@/components/container/container-search-form";
import DialogCreateTools from "@/components/dialog/dialog-create-tools";
import { DataTable } from "@/components/table/data-table";
import TablePagination from "@/components/table/table-pagination";
import { toolsColumns } from "@/components/table/tools/tools-columns";
import { getAllTools } from "@/lib/actions/actions-tools";

const categoriesData = [
  {
    value: "management",
    label: "Management",
  },
  {
    value: "analytics",
    label: "Analytics",
  },
  {
    value: "service",
    label: "Service",
  },
  {
    value: "finance",
    label: "Finance",
  },
  {
    value: "hr",
    label: "HR",
  },
];

const AdminToolsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page } = await searchParams;
  console.log({ page });
  const p = page ? parseInt(page) : 1;
  const tools = await getAllTools(p);

  return (
    <div>
      <ContainerSearchForm categoriesData={categoriesData}>
        <DialogCreateTools />
      </ContainerSearchForm>
      <DataTable columns={toolsColumns} data={tools?.data ?? []} />
      <TablePagination currentPage={p} count={tools?.count ?? 0} />
    </div>
  );
};

export default AdminToolsPage;
