"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import FormCreateTools from "../form/form-create-tools";

const DialogCreateTools = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Dialog>
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
        <FormCreateTools />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateTools;
