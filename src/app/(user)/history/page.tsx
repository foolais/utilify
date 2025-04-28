import ContainerSearchForm from "@/components/container/container-search-form";
import { DataTable } from "@/components/table/data-table";
import { historyColumns } from "@/components/table/history/history-columns";
import TablePagination from "@/components/table/table-pagination";
import { getAllLoansRequestById } from "@/lib/actions/actions-loans-request";
import { LOANS_STATUS } from "@/lib/data";
import { LoanStatus } from "@prisma/client";
import { notFound } from "next/navigation";

const HistoryPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, search = "", status } = await searchParams;

  const p = page ? parseInt(page) : 1;
  if (p === 0) return notFound();

  // validate status params
  const validStatuses = Object.values(LoanStatus) as string[];
  const statusParam = status ?? LoanStatus.pending;

  if (!validStatuses.includes(statusParam)) return notFound();

  const historyData = await getAllLoansRequestById(
    p,
    search,
    statusParam as LoanStatus,
  );

  return (
    <>
      <div className="flex-center mt-4">
        <ContainerSearchForm
          name="status"
          categoriesData={LOANS_STATUS}
          widthClassName="w-3/4 sm:w-[250px] md:w-auto md:min-w-[250px] lg:min-w-[300px]"
        />
      </div>
      <div className="sm:px-4 md:px-6">
        <DataTable columns={historyColumns} data={historyData?.data ?? []} />
        <TablePagination currentPage={p} count={historyData?.count ?? 0} />
      </div>
    </>
  );
};

export default HistoryPage;
