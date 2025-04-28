import { ToolStatus } from "@prisma/client";

export type ToolsColumn = {
  id: string;
  name: string;
  description: string;
  category: string;
  status: ToolStatus;
};

export type ToolData = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  status: ToolStatus;
  created_by: string;
  createdBy: {
    id: string;
    name: string;
  };
  updated_by: string;
  updatedBy: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
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
  toolId: string;
  tools: string;
  loan_date: Date;
  return_date: Date;
};

export type History = {
  id: string;
  tools: string;
  return_date: Date;
  loan_date: Date;
  status: "pending" | "rejected" | "borrowed" | "returned" | "overdue";
};
