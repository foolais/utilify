import ContainerSearchForm from "@/components/container/container-search-form";
import { TableLoadingSkeleton } from "@/components/skeleton/loading-skeleton";
import { adminHistoryColumns } from "@/components/table/admin-history/admin-history-columns";
import { DataTable } from "@/components/table/data-table";
import TablePagination from "@/components/table/table-pagination";
import { getAllAdminHistory } from "@/lib/actions/actions-admin-history";
import { HISTORY_CATEGORIES } from "@/lib/data";
import { TargetType } from "@prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin History | Utilify App",
  description: "Utilify App History for admin",
};

const AdminHistory = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, search = "", category } = await searchParams;

  const p = page ? parseInt(page) : 1;
  if (p === 0) return notFound();

  // validate category params
  const validStatuses = Object.values(TargetType) as string[];
  if (category && !validStatuses.includes(category.toUpperCase()))
    return notFound();

  const adminHistoryPromise = getAllAdminHistory(
    p,
    search,
    category?.toUpperCase() as TargetType,
  );

  return (
    <div>
      <ContainerSearchForm categoriesData={HISTORY_CATEGORIES}>
        <></>
      </ContainerSearchForm>
      <Suspense fallback={<TableLoadingSkeleton />}>
        <DataTableWrapper adminHistoryPromise={adminHistoryPromise} page={p} />
      </Suspense>
    </div>
  );
};

async function DataTableWrapper({
  adminHistoryPromise,
  page,
}: {
  adminHistoryPromise: ReturnType<typeof getAllAdminHistory>;
  page: number;
}) {
  const adminHistory = await adminHistoryPromise;

  return (
    <>
      <DataTable
        columns={adminHistoryColumns}
        data={adminHistory?.data ?? []}
      />
      <TablePagination currentPage={page} count={adminHistory?.count ?? 0} />
    </>
  );
}

export default AdminHistory;
