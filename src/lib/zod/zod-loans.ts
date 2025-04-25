import { object, string } from "zod";

export const LoansSchema = object({
  email: string().email("Invalid email"),
  tools: string().nonempty("Tools is required"),
  loan_date: string().nonempty("Loan Date is required"),
  return_date: string().nonempty("Return Date is required"),
  status: string().nonempty("Status is required"),
});
