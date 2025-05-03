import ContainerSearchForm from "@/components/container/container-search-form";
import { TableLoadingSkeleton } from "@/components/skeleton/loading-skeleton";
import { DataTable } from "@/components/table/data-table";
import { loansRequestColumns } from "@/components/table/loan-request.tsx/loans-request-columns";
import TablePagination from "@/components/table/table-pagination";
import { getAllLoansRequest } from "@/lib/actions/actions-loans-request";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Loans Request | Utilify App",
  description: "Utilify App Loans Request for admin",
};

interface iProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const LoanRequest = async ({ searchParams }: iProps) => {
  const { page, search = "" } = await searchParams;

  const p = page ? parseInt(page) : 1;
  if (p === 0) return notFound();

  const loansRequestPromise = getAllLoansRequest(p, search, "pending");

  return (
    <div>
      <ContainerSearchForm widthClassName="w-3/4 sm:w-[300px] lg:w-[400px]">
        <div></div>
      </ContainerSearchForm>
      <Suspense fallback={<TableLoadingSkeleton />}>
        <DataTableWrapper loansRequestPromise={loansRequestPromise} page={p} />
      </Suspense>
    </div>
  );
};

async function DataTableWrapper({
  loansRequestPromise,
  page,
}: {
  loansRequestPromise: ReturnType<typeof getAllLoansRequest>;
  page: number;
}) {
  const loansRequest = await loansRequestPromise;

  return (
    <>
      <DataTable
        columns={loansRequestColumns}
        data={loansRequest?.data ?? []}
      />
      <TablePagination currentPage={page} count={loansRequest?.count ?? 0} />
    </>
  );
}

export default LoanRequest;
