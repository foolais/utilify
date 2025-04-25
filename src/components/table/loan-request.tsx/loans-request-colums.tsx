"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import TableActionLoansRequest from "./table-actions-loans-request";

export type LoanRequest = {
  id: string;
  email: string;
  tools: string;
  loan_date: Date;
  return_date: Date;
};

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
      return moment(loanDate).format("L");
    },
  },
  {
    accessorKey: "return_date",
    header: "Return Date",
    cell: ({ getValue }) => {
      const returnDate = getValue<Date>();
      return moment(returnDate).format("L");
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
