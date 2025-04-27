import { useActionState, useEffect, useRef, useState } from "react";
import { FormFieldCombobox, FormFieldInput } from "../form-field";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { getToolById, updateTools } from "@/lib/actions/actions-tools";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { TOOLS_CATEGORIES, TOOLS_STATUS } from "@/lib/data";

interface iFormUpdateTools {
  name: string;
  description: string;
  category: string;
  status: string;
}

const FormUpdateTools = ({
  onCloseDialog,
  id,
}: {
  onCloseDialog: () => void;
  id: string;
}) => {
  const [formValues, setFormValues] = useState<iFormUpdateTools>({
    name: "",
    description: "",
    category: "",
    status: "",
  });

  const [state, formAction, isPending] = useActionState(
    updateTools.bind(null, id),
    null,
  );
  const hasRun = useRef(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getToolById(id);

      if ("error" in data) return;
      setFormValues({
        name: data.name ?? "",
        description: data.description ?? "",
        category: data.category ?? "",
        status: data.status ?? "",
      });
    };

    getData();
  }, [id]);

  useEffect(() => {
    if (!hasRun.current && state?.success && state?.message) {
      toast(state.message);
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
          value={formValues.category}
          setValue={() => setFormValues((prev) => ({ ...prev, category: "" }))}
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
          value={formValues.status}
          setValue={() => setFormValues((prev) => ({ ...prev, status: "" }))}
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
          {isPending ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default FormUpdateTools;
