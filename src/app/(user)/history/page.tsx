import ContainerSearchForm from "@/components/container/container-search-form";
import { TableLoadingSkeleton } from "@/components/skeleton/loading-skeleton";
import { DataTable } from "@/components/table/data-table";
import { historyColumns } from "@/components/table/history/history-columns";
import TablePagination from "@/components/table/table-pagination";
import { getAllLoansRequest } from "@/lib/actions/actions-loans-request";
import { LOANS_STATUS } from "@/lib/data";
import { LoanStatus } from "@prisma/client";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "History | Utilify App",
  description: "Utilify App History for user",
};

interface iProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const HistoryPage = async ({ searchParams }: iProps) => {
  const { page, search = "", status } = await searchParams;

  const p = page ? parseInt(page) : 1;
  if (p === 0) return notFound();

  // validate status params
  const validStatuses = Object.values(LoanStatus) as string[];

  if (status && !validStatuses.includes(status)) return notFound();

  const historyPromise = getAllLoansRequest(
    p,
    search,
    status as LoanStatus | undefined,
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
        <Suspense fallback={<TableLoadingSkeleton />}>
          <DataTableWrapper historyPromise={historyPromise} page={p} />
        </Suspense>
      </div>
    </>
  );
};

async function DataTableWrapper({
  historyPromise,
  page,
}: {
  historyPromise: ReturnType<typeof getAllLoansRequest>;
  page: number;
}) {
  const history = await historyPromise;

  return (
    <>
      <DataTable columns={historyColumns} data={history?.data ?? []} />
      <TablePagination currentPage={page} count={history?.count ?? 0} />
    </>
  );
}

export default HistoryPage;
