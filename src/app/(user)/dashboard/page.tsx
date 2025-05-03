import CardUtil from "@/components/card/card-util";
import ContainerSearchForm from "@/components/container/container-search-form";
import TablePagination from "@/components/table/table-pagination";
import { getAllTools } from "@/lib/actions/actions-tools";
import { TOOLS_CATEGORIES } from "@/lib/data";
import { notFound } from "next/navigation";

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, search = "", category = "" } = await searchParams;
  const p = page ? parseInt(page) : 1;

  if (p === 0) return notFound();

  const tools = await getAllTools(p, search, category, "available", 15);

  return (
    <div className="px-6">
      <div className="flex-center my-2">
        <ContainerSearchForm
          categoriesData={TOOLS_CATEGORIES}
          widthClassName="w-3/4 sm:w-[250px] md:w-auto md:min-w-[250px] lg:min-w-[300px]"
        />
      </div>
      <div className="grid max-h-[70dvh] grid-cols-2 gap-4 overflow-y-auto md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {tools?.data && tools?.data.length > 0 ? (
          tools?.data?.map((item, index) => <CardUtil key={index} {...item} />)
        ) : (
          <div className="flex-center col-span-3 mx-auto">
            <p className="text-xl font-semibold capitalize">No tools found</p>
          </div>
        )}
      </div>
      {tools?.data &&
        tools?.data.length > 0 &&
        tools?.count &&
        tools?.count > 0 && (
          <TablePagination currentPage={p} count={tools?.count ?? 0} />
        )}
    </div>
  );
};

export default DashboardPage;
