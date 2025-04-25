import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FormFieldCombobox, FormFieldInput } from "../form-field";
import { createLoans } from "@/lib/actions/actions-loans";
import { Button } from "@/components/ui/button";

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

const FormCreateLoans = ({ onCloseDialog }: { onCloseDialog: () => void }) => {
  const [formValues, setFormValues] = useState<iFormLoans>({
    email: "",
    tools: "",
    loan_date: "",
    return_date: "",
    status: "",
  });

  const [toolsValue, setToolsValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  const [state, formAction, isPending] = useActionState(createLoans, null);
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

export default FormCreateLoans;
