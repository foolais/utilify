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
import { formatDate } from "@/lib/utils";
import { Check, X } from "lucide-react";
import React from "react";

interface iProps {
  email: string;
  tools: string;
  loan_date: Date;
  return_date: Date;
}

const TableActionLoansRequest = ({
  email,
  tools,
  loan_date,
  return_date,
}: iProps) => {
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
              Confirm Loan Request Rejection
            </AlertDialogTitle>
            <AlertDialogDescription>
              {email} submitted a loan request for {tools} on{" "}
              {formatDate(loan_date)}, with a scheduled return on{" "}
              {formatDate(return_date)}.
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
              Confirm Loan Request Approval
            </AlertDialogTitle>
            <AlertDialogDescription>
              <span>
                {email} submitted a loan request for {tools} on{" "}
                {formatDate(loan_date)}, with a scheduled return on{" "}
                {formatDate(return_date)}.
              </span>
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
