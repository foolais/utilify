"use client";

import { Badge } from "@/components/ui/badge";
import { truncateText } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { InfoIcon, MoreHorizontal, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";

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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions {row.index + 1}</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <InfoIcon />
              Details
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <PencilIcon />
              Update
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive cursor-pointer">
              <Trash2Icon color="red" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
