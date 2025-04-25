import { useEffect, useState } from "react";
import { FormFieldInput } from "../form-field";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

interface iFormDetailTool {
  name: string;
  description: string;
  category: string;
  status: string;
}

const FormDetailTools = () => {
  const [formValues, setFormValues] = useState<iFormDetailTool>({
    name: "",
    description: "",
    category: "",
    status: "",
  });

  useEffect(() => {
    setFormValues({
      name: "Project Tracker",
      description: "Tool for managing project milestones and deadlines.",
      category: "management",
      status: "available",
    });
  }, []);

  return (
    <form id="form-create-tools">
      <div className="grid w-full items-center gap-4">
        <FormFieldInput
          name="name"
          label="Name"
          value={formValues.name}
          placeholder="Name"
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
          name="category"
          label="Category"
          value={formValues.category}
          placeholder="Category"
          disabled
        />
        <FormFieldInput
          name="status"
          label="Status"
          value={formValues.status}
          placeholder="Status"
          disabled
        />
      </div>
    </form>
  );
};

export default FormDetailTools;
