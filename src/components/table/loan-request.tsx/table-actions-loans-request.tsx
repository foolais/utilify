import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import React from "react";

const TableActionLoansRequest = () => {
  return (
    <div className="flex-center mx-auto gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="bg-red-100 hover:bg-red-300"
          >
            <X color="red" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500">
              Are you sure to reject?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently reject the
              loan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="bg-green-100 hover:bg-green-300"
          >
            <Check color="green" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-500">
              Are you sure to accept?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently accept the
              loan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TableActionLoansRequest;
