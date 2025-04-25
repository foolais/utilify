import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FormFieldCombobox, FormFieldInput } from "../form-field";
import { createLoansList } from "@/lib/actions/actions-loans-list";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

interface iFormLoans {
  email: string;
  tools: string;
  loan_date: string;
  return_date: string;
  status: string;
}

const statusData = [
  { value: "available", label: "Available" },
  { value: "borrowed", label: "Borrowed" },
  { value: "returned", label: "Returned" },
  { value: "overdue", label: "Overdue" },
];

const toolsData = [
  { value: "Processor", label: "Processor" },
  { value: "Monitor", label: "Monitor" },
  { value: "Keyboard", label: "Keyboard" },
  { value: "Mouse", label: "Mouse" },
  { value: "Printer", label: "Printer" },
];

const FormCreateLoansList = ({
  onCloseDialog,
}: {
  onCloseDialog: () => void;
}) => {
  const [formValues, setFormValues] = useState<iFormLoans>({
    email: "",
    tools: "",
    loan_date: "",
    return_date: "",
    status: "",
  });

  const [toolsValue, setToolsValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [loanDate, setLoanDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  const [state, formAction, isPending] = useActionState(createLoansList, null);
  const hasRun = useRef(false);

  useEffect(() => {
    console.log({ state });
    if (!hasRun.current && state?.success && state?.message) {
      toast(state.message);
      onCloseDialog();
      hasRun.current = true;
    }
  }, [state, onCloseDialog]);

  return (
    <form id="form-create-loans" action={formAction}>
      <div className="grid w-full items-center gap-4">
        <FormFieldInput
          name="email"
          label="Email"
          value={formValues.email}
          setFormValues={setFormValues}
          error={
            state?.error && "email" in state.error ? state.error.email : []
          }
          placeholder="Enter email..."
        />
        <FormFieldCombobox
          name="tools"
          label="Tools"
          placeholder="Select tools"
          data={toolsData}
          value={toolsValue}
          setValue={setToolsValue}
          onChangeForm={(val) =>
            setFormValues((prev) => ({ ...prev, tools: val }))
          }
          error={
            state?.error && "tools" in state.error ? state.error.tools : []
          }
        />
        <div className="flex w-full flex-col space-y-1.5">
          <Label>Loan Date</Label>
          <input type="hidden" name="loan_date" value={loanDate?.toString()} />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !loanDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {loanDate ? (
                  moment(loanDate).format("L")
                ) : (
                  <span>Pick a loan date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={loanDate}
                onSelect={setLoanDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {state?.error &&
          "loan_date" in state.error &&
          state.error.loan_date ? (
            <div aria-live="polite" aria-atomic="true">
              <span className="error-message">
                {state.error.loan_date.join(" & ")}
              </span>
            </div>
          ) : null}
        </div>
        <div className="flex w-full flex-col space-y-1.5">
          <Label>Return Date</Label>
          <input
            type="hidden"
            name="return_date"
            value={returnDate?.toString()}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !returnDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {returnDate ? (
                  moment(returnDate).format("L")
                ) : (
                  <span>Pick a return date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
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
        <FormFieldCombobox
          name="status"
          label="Status"
          placeholder="Select status"
          data={statusData}
          value={statusValue}
          setValue={setStatusValue}
          onChangeForm={(val) =>
            setFormValues((prev) => ({ ...prev, status: val }))
          }
          error={
            state?.error && "status" in state.error ? state.error.status : []
          }
        />
      </div>
      <div className="mt-4 flex items-center justify-end">
        <Button disabled={isPending} form="form-create-loans">
          Create
        </Button>
      </div>
    </form>
  );
};

export default FormCreateLoansList;
