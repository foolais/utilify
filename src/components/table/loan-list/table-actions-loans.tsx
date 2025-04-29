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
import FormDetailLoansList from "../../form/loans-list/form-detail-loans-list";
import FormUpdateLoansList from "../../form/loans-list/form-update-loans-list";

const TableActionLoans = ({ index, id }: { index: number; id: string }) => {
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
        title={openStatus.type === "detail" ? "Detail Loans" : "Update Loans"}
        description={
          openStatus.type === "detail"
            ? `Detail Loans No ${index + 1}`
            : `Update Loans No ${index + 1}`
        }
      >
        {openStatus.type === "detail" ? (
          <FormDetailLoansList />
        ) : openStatus.type === "update" ? (
          <FormUpdateLoansList
            id={id}
            onCloseDialog={() => setOpenStatus({ value: false, type: "" })}
          />
        ) : null}
      </DialogForm>
    </>
  );
};

export default TableActionLoans;
