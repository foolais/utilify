"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export type Loans = {
  id: string;
  email: string;
  tools: string;
  loan_date: Date;
  return_date: Date;
  status: "borrowed" | "returned" | "overdue";
};

export const loansColumns: ColumnDef<Loans>[] = [
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
    accessorKey: "status",
    header: () => <div className="flex-center">Status</div>,
    cell: ({ getValue }) => {
      const status = getValue<string>();
      return (
        <div className="flex-center mx-auto">
          <Badge className="mx-auto">{status}</Badge>
        </div>
      );
    },
  },
];
