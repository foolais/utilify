import { useEffect, useState } from "react";
import { FormFieldInput } from "../form-field";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { getToolById } from "@/lib/actions/actions-tools";

interface iFormDetailTool {
  name: string;
  description: string;
  category: string;
  status: string;
}

const FormDetailTools = ({ id }: { id: string }) => {
  const [formValues, setFormValues] = useState<iFormDetailTool>({
    name: "",
    description: "",
    category: "",
    status: "",
  });

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
          className="capitalize"
          name="category"
          label="Category"
          value={formValues.category}
          placeholder="Category"
          disabled
        />
        <FormFieldInput
          className="capitalize"
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
