import { useActionState, useState } from "react";
import { FormFieldCombobox, FormFieldInput } from "./form-field";
import { registerCredentials } from "@/lib/actions/actions-auth";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface iFormRegister {
  name: string;
  description: string;
  category: string;
  status: string;
}

const categoriesData = [
  { value: "management", label: "Management" },
  { value: "analytics", label: "Analytics" },
  { value: "service", label: "Service" },
  { value: "finance", label: "Finance" },
  { value: "hr", label: "HR" },
];

const statusData = [
  { value: "available", label: "Available" },
  { value: "borrowed", label: "Borrowed" },
  { value: "returned", label: "Returned" },
  { value: "overdue", label: "Overdue" },
];

const FormCreateTools = () => {
  const [formValues, setFormValues] = useState<iFormRegister>({
    name: "",
    description: "",
    category: "",
    status: "",
  });

  const [categoryValue, setCategoryValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  const [state, formAction, isPending] = useActionState(
    registerCredentials,
    null,
  );

  return (
    <form>
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
        </div>
        <FormFieldCombobox
          label="Category"
          placeholder="Select category"
          data={categoriesData}
          value={categoryValue}
          setValue={setCategoryValue}
          onChangeForm={(val) =>
            setFormValues((prev) => ({ ...prev, category: val }))
          }
        />
        <FormFieldCombobox
          label="Status"
          placeholder="Select status"
          data={statusData}
          value={statusValue}
          setValue={setStatusValue}
          onChangeForm={(val) =>
            setFormValues((prev) => ({ ...prev, status: val }))
          }
        />
      </div>
    </form>
  );
};

export default FormCreateTools;
