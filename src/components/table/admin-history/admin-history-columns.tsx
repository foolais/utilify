"use client";

import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { AdminHistory } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

export const adminHistoryColumns: ColumnDef<AdminHistory>[] = [
  {
    accessorKey: "no",
    header: "No",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "targetType",
    header: () => <div className="flex-center">Category</div>,
    cell: ({ getValue }) => {
      const Type = getValue<string>();
      return (
        <div className="flex-center mx-auto">
          <Badge
            className={cn(
              "mx-auto text-black",
              Type === "LOAN" ? "bg-green-500" : "bg-blue-500",
            )}
          >
            {Type}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const createdAt = getValue<Date>();
      return formatDate(createdAt);
    },
  },
];
