"use client";

import { Badge } from "@/components/ui/badge";
import { truncateText } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type Tools = {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "available" | "borrowed" | "returned" | "overdue";
};

export const toolsColumns: ColumnDef<Tools>[] = [
  {
    accessorKey: "no",
    header: "No",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => {
      const description = getValue<string>();
      return truncateText(description, 20);
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="flex-center">Category</div>,
    cell: ({ getValue }) => {
      const category = getValue<string>();
      return (
        <div className="flex-center mx-auto">
          <Badge className="mx-auto">{category}</Badge>
        </div>
      );
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
