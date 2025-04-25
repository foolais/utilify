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
import { useSidebar } from "../ui/sidebar";
import FormCreateTools from "../form/tools/form-create-tools";
import { useState } from "react";

const DialogCreateTools = () => {
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
          <DialogTitle>Add new tools</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <FormCreateTools onCloseDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateTools;
