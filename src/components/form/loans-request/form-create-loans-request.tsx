"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { FormFieldInput } from "../form-field";
import moment from "moment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn, getDayBefore } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createLoanRequest } from "@/lib/actions/actions-loans-request";
import { toast } from "sonner";

interface iFormCreateLoansRequest {
  tools: string;
  description: string;
  loan_date: Date;
  return_date: Date;
}

const FormCreateLoansRequest = ({
  id,
  name,
  description,
  onCloseDialog,
}: {
  id: string;
  name: string;
  description: string;
  onCloseDialog: () => void;
}) => {
  const [formValues, setFormValues] = useState<iFormCreateLoansRequest>({
    tools: name,
    description: description,
    loan_date: new Date(),
    return_date: new Date(),
  });

  const [state, formAction, isPending] = useActionState(
    createLoanRequest.bind(null, id),
    null,
  );
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current && state?.success && state?.message) {
      toast.success(state.message, { duration: 1500 });
      onCloseDialog();
      hasRun.current = true;
    }
  }, [state, onCloseDialog]);

  return (
    <form id="form-create-loans-request" action={formAction}>
      <div className="grid w-full items-center gap-5">
        <FormFieldInput
          name="tools"
          label="Tools"
          value={formValues.tools}
          placeholder="Tools"
          disabled
        />
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Description"
            value={formValues.description}
            disabled
          />
        </div>
        <FormFieldInput
          name="loan_date"
          label="Loan Date"
          value={moment(formValues.loan_date).format("LL")}
          placeholder="Loan Date"
          disabled
        />
        <div className="flex w-full flex-col space-y-1.5">
          <Label>Return Date</Label>
          <input
            type="hidden"
            name="return_date"
            value={formValues.return_date?.toString()}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formValues.return_date && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {formValues.return_date ? (
                  moment(formValues.return_date).format("LL")
                ) : (
                  <span>Pick a return date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formValues.return_date}
                onSelect={(date) => {
                  if (date) {
                    setFormValues((prev) => ({
                      ...prev,
                      return_date: date,
                    }));
                  }
                }}
                initialFocus
                disabled={(date) => {
                  return date < getDayBefore();
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        {state?.error &&
        "return_date" in state.error &&
        state.error.return_date ? (
          <div aria-live="polite" aria-atomic="true">
            <span className="error-message">
              {state.error.return_date.join(" & ")}
            </span>
          </div>
        ) : null}
      </div>
      <div className="mt-6 flex items-center justify-end">
        <Button disabled={isPending} form="form-create-loans-request">
          Request a Loan
        </Button>
      </div>
    </form>
  );
};

export default FormCreateLoansRequest;
