"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useSidebar } from "../ui/sidebar";
import FormCreateLoans from "../form/loans/form-create-loans";

const DialogCreateLoans = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-center w-3/4 gap-1 sm:w-auto">
          <PlusIcon />
          <span
            className={cn(isCollapsed ? "block" : "block md:hidden lg:block")}
          >
            Add
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add new loans</DialogTitle>
          <DialogDescription>Create a new loan.</DialogDescription>
        </DialogHeader>
        <FormCreateLoans onCloseDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateLoans;
