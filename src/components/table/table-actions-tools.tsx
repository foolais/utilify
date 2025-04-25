"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { InfoIcon, MoreHorizontal, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import DialogDetailTools from "../dialog/dialog-detail-tools";
import DialogUpdateTools from "../dialog/dialog-update-tools";

const TableActionTools = ({ index }: { index: number }) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions {index + 1}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setIsOpenDetail(true)}
            className="cursor-pointer"
          >
            <InfoIcon />
            Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpenUpdate(true)}
            className="cursor-pointer"
          >
            <PencilIcon />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive cursor-pointer">
            <Trash2Icon color="red" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <>
        <DialogDetailTools
          isOpen={isOpenDetail}
          onClose={() => setIsOpenDetail(false)}
        />
        <DialogUpdateTools
          isOpen={isOpenUpdate}
          onClose={() => setIsOpenUpdate(false)}
        />
      </>
    </>
  );
};

export default TableActionTools;
