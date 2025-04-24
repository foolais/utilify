import ContainerSearchForm from "@/components/container/container-search-form";
import { DataTable } from "@/components/table/data-table";
import { toolsColumns } from "@/components/table/tools-colums";

const toolsData = [
  {
    id: "1",
    no: "1",
    name: "Project Tracker",
    description: "Tool for managing project milestones and deadlines.",
    category: "management",
    status: "available" as const,
  },
  {
    id: "2",
    no: "2",
    name: "Data Visualizer",
    description: "Generates dynamic charts from raw data inputs.",
    category: "analytics",
    status: "borrowed" as const,
  },
  {
    id: "3",
    no: "3",
    name: "Customer Support Dashboard",
    description: "Tracks service tickets and user queries in real-time.",
    category: "service",
    status: "available" as const,
  },
  {
    id: "4",
    no: "4",
    name: "Budget Planner",
    description: "Helps teams plan and track expenses effectively.",
    category: "finance",
    status: "returned" as const,
  },
  {
    id: "5",
    no: "5",
    name: "Recruitment Tracker",
    description: "Streamlines candidate tracking and interview scheduling.",
    category: "hr",
    status: "available" as const,
  },
  {
    id: "6",
    no: "6",
    name: "Team Scheduler",
    description: "Assists with team calendar management and shift planning.",
    category: "management",
    status: "overdue" as const,
  },
  {
    id: "7",
    no: "7",
    name: "KPI Analyzer",
    description: "Analyzes key performance indicators across departments.",
    category: "analytics",
    status: "available" as const,
  },
  {
    id: "8",
    no: "8",
    name: "Help Desk System",
    description: "Manages internal support tickets and FAQs.",
    category: "service",
    status: "borrowed" as const,
  },
  {
    id: "9",
    no: "9",
    name: "Invoice Generator",
    description: "Generates and sends invoices automatically.",
    category: "finance",
    status: "returned" as const,
  },
  {
    id: "10",
    no: "10",
    name: "Employee Onboarding Tool",
    description: "Facilitates HR tasks during new employee onboarding.",
    category: "hr",
    status: "available" as const,
  },
  {
    id: "11",
    no: "11",
    name: "OKR Manager",
    description: "Helps track objectives and key results across teams.",
    category: "management",
    status: "borrowed" as const,
  },
  {
    id: "12",
    no: "12",
    name: "Trend Analyzer",
    description: "Identifies and reports business performance trends.",
    category: "analytics",
    status: "available" as const,
  },
  {
    id: "13",
    no: "13",
    name: "Live Chat Support",
    description: "Real-time chat system for customer engagement.",
    category: "service",
    status: "overdue" as const,
  },
  {
    id: "14",
    no: "14",
    name: "Expense Monitor",
    description: "Tracks and categorizes daily business expenses.",
    category: "finance",
    status: "returned" as const,
  },
  {
    id: "15",
    no: "15",
    name: "Payroll Assistant",
    description: "Automates employee salary calculation and disbursement.",
    category: "hr",
    status: "available" as const,
  },
];

const categoriesData = [
  {
    value: "management",
    label: "Management",
  },
  {
    value: "analytics",
    label: "Analytics",
  },
  {
    value: "service",
    label: "Service",
  },
  {
    value: "finance",
    label: "Finance",
  },
  {
    value: "hr",
    label: "HR",
  },
];

const AdminToolsPage = () => {
  return (
    <div>
      <ContainerSearchForm categoriesData={categoriesData} />
      <DataTable columns={toolsColumns} data={toolsData} />
    </div>
  );
};

export default AdminToolsPage;
