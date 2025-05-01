"use client";

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
import { updateLoanRequest } from "@/lib/actions/actions-loans-request";
import { formatDate } from "@/lib/utils";
import { LoanRequest } from "@/types/types";
import { Check, X, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const TableActionLoansRequest = ({
  id,
  email,
  tools,
  toolId,
  loan_date,
  return_date,
}: LoanRequest) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState<
    "accept" | "reject" | null
  >(null);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);

  const handleAction = async (type: "accept" | "reject") => {
    setIsLoading(true);
    setCurrentAction(type);
    try {
      const res = await updateLoanRequest(type, id, toolId);
      if (res.success) toast.success(res.message, { duration: 1500 });

      if (type === "accept") {
        setIsAcceptOpen(false);
      } else {
        setIsRejectOpen(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("An error occurred while processing your request");
    } finally {
      setIsLoading(false);
      setCurrentAction(null);
    }
  };

  return (
    <div className="flex-center mx-auto gap-2">
      {/* Reject Dialog */}
      <AlertDialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
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
              {isLoading && currentAction === "reject" ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing Rejection...
                </div>
              ) : (
                "Confirm Loan Request Rejection"
              )}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {email} submitted a loan request for {tools} on{" "}
              {formatDate(loan_date)}, with a scheduled return on{" "}
              {formatDate(return_date)}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleAction("reject");
              }}
              disabled={isLoading}
            >
              {isLoading && currentAction === "reject" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Yes"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Accept Dialog */}
      <AlertDialog open={isAcceptOpen} onOpenChange={setIsAcceptOpen}>
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
              {isLoading && currentAction === "accept" ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing Approval...
                </div>
              ) : (
                "Confirm Loan Request Approval"
              )}
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
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleAction("accept");
              }}
              disabled={isLoading}
            >
              {isLoading && currentAction === "accept" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Yes"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TableActionLoansRequest;
