export type Tools = {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "available" | "unavailable" | "borrowed" | "pending";
};

export type LoansList = {
  id: string;
  email: string;
  tools: string;
  loan_date: Date;
  return_date: Date;
  status: "borrowed" | "returned" | "overdue";
};

export type LoanRequest = {
  id: string;
  email: string;
  tools: string;
  loan_date: Date;
  return_date: Date;
};

export type History = {
  id: string;
  tools: string;
  return_date: Date;
  loan_date: Date;
  status: "pending" | "borrowed" | "returned" | "overdue";
};
