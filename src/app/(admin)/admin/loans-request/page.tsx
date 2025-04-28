import ContainerSearchForm from "@/components/container/container-search-form";
import { DataTable } from "@/components/table/data-table";
import { loansRequestColumns } from "@/components/table/loan-request.tsx/loans-request-columns";
import TablePagination from "@/components/table/table-pagination";
import { getAllLoansRequest } from "@/lib/actions/actions-loans-request";
import { notFound } from "next/navigation";

const LoanRequest = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, search = "" } = await searchParams;

  const p = page ? parseInt(page) : 1;
  if (p === 0) return notFound();

  const { count, data } = await getAllLoansRequest(p, search, "pending");

  return (
    <div>
      <ContainerSearchForm widthClassName="w-3/4 sm:w-[300px] lg:w-[400px]">
        <div></div>
      </ContainerSearchForm>
      <DataTable columns={loansRequestColumns} data={data ?? []} />
      <TablePagination currentPage={p} count={count ?? 0} />
    </div>
  );
};

export default LoanRequest;
