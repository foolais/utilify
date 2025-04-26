"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { InfoIcon, MoreHorizontal, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import DialogForm from "../../dialog/dialog-form";
import FormDetailTools from "../../form/tools/form-detail-tools";
import FormUpdateTools from "../../form/tools/form-update-tools";

const TableActionTools = ({ index }: { index: number }) => {
  const [openStatus, setOpenStatus] = useState({
    value: false,
    type: "",
  });

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
          <DropdownMenuLabel>Actions for No {index + 1}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setOpenStatus({ value: true, type: "detail" })}
            className="cursor-pointer"
          >
            <InfoIcon />
            Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenStatus({ value: true, type: "update" })}
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
      <DialogForm
        isOpen={openStatus.value}
        onClose={() => setOpenStatus({ value: false, type: "" })}
        title={openStatus.type === "detail" ? "Detail Tools" : "Update Tools"}
        description={
          openStatus.type === "detail" ? "Detail Tools" : "Update Tools"
        }
      >
        {openStatus.type === "detail" ? (
          <FormDetailTools />
        ) : openStatus.type === "update" ? (
          <FormUpdateTools
            onCloseDialog={() => setOpenStatus({ value: false, type: "" })}
          />
        ) : null}
      </DialogForm>
    </>
  );
};

export default TableActionTools;
