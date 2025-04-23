import CardUtil from "@/components/card/card-util";
import FormSearch from "@/components/form/form-search";

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
];

const DashboardPage = () => {
  return (
    <div className="w-full py-4">
      <FormSearch isFilterCategory />
      <div className="my-4 grid grid-cols-3 gap-4">
        {dummyData.map((item, index) => (
          <CardUtil
            key={index}
            name={item.name}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
