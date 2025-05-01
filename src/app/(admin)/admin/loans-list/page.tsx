import ContainerSearchForm from "@/components/container/container-search-form";
import DialogCreateLoansList from "@/components/dialog/dialog-create-loans-list";
import { DataTable } from "@/components/table/data-table";
import { loansListColumns } from "@/components/table/loan-list/loans-list-columms";
import TablePagination from "@/components/table/table-pagination";
import { getAllLoansRequest } from "@/lib/actions/actions-loans-request";
import { LOANS_STATUS } from "@/lib/data";
import { LoanStatus } from "@prisma/client";
import { notFound } from "next/navigation";

const AdminBorrowersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, search = "", status } = await searchParams;
  const p = page ? parseInt(page) : 1;
  if (p === 0) return notFound();

  // validate status params
  const validStatuses = Object.values(LoanStatus) as string[];
  if (status && !validStatuses.includes(status)) return notFound();

  const { count, data } = await getAllLoansRequest(
    p,
    search,
    status as LoanStatus | undefined,
  );

  return (
    <div>
      <ContainerSearchForm categoriesData={LOANS_STATUS} name="status">
        <DialogCreateLoansList />
      </ContainerSearchForm>
      <DataTable columns={loansListColumns} data={data ?? []} />
      <TablePagination currentPage={p} count={count ?? 0} />
    </div>
  );
};

export default AdminBorrowersPage;
