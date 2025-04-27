"use client";

import { Badge } from "@/components/ui/badge";
import { History } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const historyColumns: ColumnDef<History>[] = [
  {
    accessorKey: "no",
    header: "No",
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
