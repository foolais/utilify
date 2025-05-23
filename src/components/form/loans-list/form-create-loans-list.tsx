"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { FormFieldCombobox, FormFieldInput } from "../form-field";
import { createLoansList } from "@/lib/actions/actions-loans-list";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, getDayAfter } from "@/lib/utils";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { LOANS_STATUS } from "@/lib/data";
import { getAllTools } from "@/lib/actions/actions-tools";
import { debounce } from "lodash";

interface iFormLoans {
  email: string;
  tools: string;
  loan_date: Date;
  return_date: Date;
  status: string;
}

interface iToolData {
  value: string;
  label: string;
}

const FormCreateLoansList = ({
  onCloseDialog,
}: {
  onCloseDialog: () => void;
}) => {
  const [formValues, setFormValues] = useState<iFormLoans>({
    email: "",
    tools: "",
    loan_date: new Date(),
    return_date: getDayAfter(),
    status: "",
  });

  const [toolsValue, setToolsValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [toolsData, setToolsData] = useState<iToolData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [state, formAction, isPending] = useActionState(createLoansList, null);
  const hasRun = useRef(false);

  // Memoized debounced fetch function
  const debouncedFetchTools = useMemo(
    () =>
      debounce(async (query: string) => {
        try {
          setIsSearching(true);
          const { data } = await getAllTools(
            1,
            encodeURIComponent(query),
            "",
            "available",
            5,
          );

          const mappedData = Array.isArray(data)
            ? data.map((tool) => ({
                value: tool.id,
                label: tool.name,
              }))
            : [];

          setToolsData(mappedData);
        } catch (error) {
          console.error("Search error:", error);
          toast.error(
            `Failed to search tools: ${error instanceof Error ? error.message : String(error)}`,
          );
          setToolsData([]);
        } finally {
          setIsSearching(false);
        }
      }, 300),
    [],
  );

  // Handle search query changes
  const handleSearch = (query: string) => {
    if (query.trim()) {
      debouncedFetchTools(query);
    }
  };

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedFetchTools.cancel();
    };
  }, [debouncedFetchTools]);

  // Initial data load
  useEffect(() => {
    debouncedFetchTools("");
  }, [debouncedFetchTools]);

  useEffect(() => {
    if (!hasRun.current && state?.success && state?.message) {
      toast.success(state.message, { duration: 1500 });
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
          isLoadingQuery={isSearching}
          data={toolsData}
          value={toolsValue}
          setValue={setToolsValue}
          isQuerySearch
          onSearch={handleSearch}
          onChangeForm={(val) =>
            setFormValues((prev) => ({ ...prev, tools: val }))
          }
          error={
            state?.error && "tools" in state.error ? state.error.tools : []
          }
        />
        <div className="flex w-full flex-col space-y-1.5">
          <Label>Loan Date</Label>
          <input
            type="hidden"
            name="loan_date"
            value={formValues.loan_date?.toString()}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formValues.loan_date && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {formValues.loan_date ? (
                  moment(formValues.loan_date).format("LL")
                ) : (
                  <span>Pick a loan date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formValues.loan_date}
                onSelect={(date) => {
                  if (date) {
                    setFormValues((prev) => ({
                      ...prev,
                      loan_date: date,
                    }));
                  }
                }}
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
          data={LOANS_STATUS}
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
