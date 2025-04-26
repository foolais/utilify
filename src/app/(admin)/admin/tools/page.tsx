import ContainerSearchForm from "@/components/container/container-search-form";
import DialogCreateTools from "@/components/dialog/dialog-create-tools";
import { DataTable } from "@/components/table/data-table";
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

const AdminToolsPage = async () => {
  const tools = await getAllTools();

  return (
    <div>
      <ContainerSearchForm categoriesData={categoriesData}>
        <DialogCreateTools />
      </ContainerSearchForm>
      <DataTable columns={toolsColumns} data={tools?.data ?? []} />
    </div>
  );
};

export default AdminToolsPage;
