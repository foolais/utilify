import { object, string } from "zod";

export const LoansRequestSchema = object({
  return_date: string().nonempty("Return Date is required"),
});
