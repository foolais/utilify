import { object, string } from "zod";

export const ToolsSchema = object({
  name: string()
    .min(3, "Name must be more than 3 characters")
    .max(20, "Name must be less than 20 characters"),
  description: string()
    .min(3, "Description must be more than 3 characters")
    .max(20, "Description must be less than 20 characters")
    .optional(),
  category: string().nonempty("Category is required"),
  status: string().nonempty("Status is required"),
});
