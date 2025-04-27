"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import TableActionLoansRequest from "./table-actions-loans-request";
import { LoanRequest } from "@/types/types";

export const loansRequestColumns: ColumnDef<LoanRequest>[] = [
  {
    accessorKey: "no",
    header: "No",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "tools",
    header: "Tools",
  },
  {
    accessorKey: "loan_date",
    header: "Loan Date",
    cell: ({ getValue }) => {
      const loanDate = getValue<Date>();
      return moment(loanDate).format("LL");
    },
  },
  {
    accessorKey: "return_date",
    header: "Return Date",
    cell: ({ getValue }) => {
      const returnDate = getValue<Date>();
      return moment(returnDate).format("LL");
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return <TableActionLoansRequest />;
    },
  },
];
