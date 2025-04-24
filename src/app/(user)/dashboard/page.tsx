import ContainerCardUtil from "@/components/container/container-card-util";

const dummyData = [
  {
    name: "Inventory Manager",
    description: "Tool for tracking stock and supplies in real-time.",
    category: "Management",
  },
  {
    name: "Sales Dashboard",
    description: "Monitor and analyze sales performance across regions.",
    category: "Analytics",
  },
  {
    name: "Customer Support Portal",
    description: "Manage customer inquiries and feedback efficiently.",
    category: "Service",
  },
  {
    name: "Invoice Generator",
    description: "Generate and manage digital invoices for clients.",
    category: "Finance",
  },
  {
    name: "Employee Scheduler",
    description: "Schedule shifts and track attendance easily.",
    category: "HR",
  },
  {
    name: "Budget Planner",
    description: "Plan, track, and optimize business budgets.",
    category: "Finance",
  },
  {
    name: "Performance Tracker",
    description: "Track and evaluate employee performance metrics.",
    category: "HR",
  },
  {
    name: "CRM System",
    description: "Manage client relationships and sales pipeline.",
    category: "Service",
  },
  {
    name: "Procurement Portal",
    description: "Automate and manage purchasing workflows.",
    category: "Management",
  },
  {
    name: "Expense Analyzer",
    description: "Gain insights into your business expenses.",
    category: "Analytics",
  },
  {
    name: "Time Tracker",
    description: "Log and monitor time spent on projects.",
    category: "HR",
  },
  {
    name: "Payroll Processor",
    description: "Automate employee salary and tax calculations.",
    category: "Finance",
  },
  {
    name: "Task Manager",
    description: "Organize, prioritize, and track daily tasks.",
    category: "Management",
  },
  {
    name: "Survey Builder",
    description: "Create and analyze surveys for customer feedback.",
    category: "Service",
  },
  {
    name: "KPI Dashboard",
    description: "Visualize and measure key performance indicators.",
    category: "Analytics",
  },
  {
    name: "Leave Management",
    description: "Handle employee leave requests and balances.",
    category: "HR",
  },
  {
    name: "Cash Flow Monitor",
    description: "Track and forecast your cash inflows and outflows.",
    category: "Finance",
  },
  {
    name: "Meeting Scheduler",
    description: "Plan meetings with built-in availability sync.",
    category: "Management",
  },
  {
    name: "Client Onboarding Tool",
    description: "Streamline the new client onboarding process.",
    category: "Service",
  },
  {
    name: "Market Analysis Tool",
    description: "Analyze market trends and competitor behavior.",
    category: "Analytics",
  },
];

const DashboardPage = () => {
  return (
    <div className="w-full">
      <ContainerCardUtil data={dummyData} />
    </div>
  );
};

export default DashboardPage;
