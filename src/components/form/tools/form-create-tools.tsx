import { useActionState, useEffect, useRef, useState } from "react";
import { FormFieldCombobox, FormFieldInput } from "../form-field";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { createTools } from "@/lib/actions/actions-tools";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { TOOLS_CATEGORIES, TOOLS_STATUS } from "@/lib/data";

interface iFormCreateTool {
  name: string;
  description: string;
  category: string;
  status: string;
}

const FormCreateTools = ({ onCloseDialog }: { onCloseDialog: () => void }) => {
  const [formValues, setFormValues] = useState<iFormCreateTool>({
    name: "",
    description: "",
    category: "",
    status: "",
  });

  const [categoryValue, setCategoryValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  const [state, formAction, isPending] = useActionState(createTools, null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current && state?.success && state?.message) {
      toast.success(state.message, { duration: 1500 });
      onCloseDialog();
      hasRun.current = true;
    }
  }, [state, onCloseDialog]);

  return (
    <form id="form-create-tools" action={formAction}>
      <div className="grid w-full items-center gap-4">
        <FormFieldInput
          name="name"
          label="Name"
          value={formValues.name}
          setFormValues={setFormValues}
          error={state?.error && "name" in state.error ? state.error.name : []}
          placeholder="Enter name..."
        />
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter description..."
            value={formValues.description}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          {state?.error &&
          "description" in state.error &&
          state.error.description ? (
            <div aria-live="polite" aria-atomic="true">
              <span className="error-message">
                {state.error.description.join(" & ")}
              </span>
            </div>
          ) : null}
        </div>
        <FormFieldCombobox
          name="category"
          label="Category"
          placeholder="Select category"
          data={TOOLS_CATEGORIES}
          value={categoryValue}
          setValue={setCategoryValue}
          onChangeForm={(val) =>
            setFormValues((prev) => ({ ...prev, category: val }))
          }
          error={
            state?.error && "category" in state.error
              ? state.error.category
              : []
          }
        />
        <FormFieldCombobox
          name="status"
          label="Status"
          placeholder="Select status"
          data={TOOLS_STATUS}
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
        <Button disabled={isPending} form="form-create-tools">
          {isPending ? "Creating..." : "create"}
        </Button>
      </div>
    </form>
  );
};

export default FormCreateTools;
