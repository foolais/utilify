import ContainerSearchForm from "@/components/container/container-search-form";
import { DataTable } from "@/components/table/data-table";
import { historyColumns } from "@/components/table/history/history-columns";

const categoriesData = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "borrowed",
    label: "Borrowed",
  },
  {
    value: "returned",
    label: "Returned",
  },
  {
    value: "overdue",
    label: "Overdue",
  },
];

const historyData = [
  {
    id: "1",
    no: 1,
    tools: "Hammer",
    return_date: new Date("2025-05-05"),
    loan_date: new Date("2025-04-25"),
    status: "borrowed" as const,
  },
  {
    id: "2",
    no: 2,
    tools: "Screwdriver",
    return_date: new Date("2025-04-28"),
    loan_date: new Date("2025-04-20"),
    status: "returned" as const,
  },
  {
    id: "3",
    no: 3,
    tools: "Wrench",
    return_date: new Date("2025-04-30"),
    loan_date: new Date("2025-04-22"),
    status: "overdue" as const,
  },
  {
    id: "4",
    no: 4,
    tools: "Drill",
    return_date: new Date("2025-05-02"),
    loan_date: new Date("2025-04-26"),
    status: "borrowed" as const,
  },
  {
    id: "5",
    no: 5,
    tools: "Saw",
    return_date: new Date("2025-05-01"),
    loan_date: new Date("2025-04-24"),
    status: "pending" as const,
  },
  {
    id: "6",
    no: 6,
    tools: "Chisel",
    return_date: new Date("2025-04-30"),
    loan_date: new Date("2025-04-21"),
    status: "returned" as const,
  },
  {
    id: "7",
    no: 7,
    tools: "Tape Measure",
    return_date: new Date("2025-04-27"),
    loan_date: new Date("2025-04-19"),
    status: "overdue" as const,
  },
  {
    id: "8",
    no: 8,
    tools: "Pliers",
    return_date: new Date("2025-05-06"),
    loan_date: new Date("2025-04-25"),
    status: "borrowed" as const,
  },
  {
    id: "9",
    no: 9,
    tools: "Sander",
    return_date: new Date("2025-04-29"),
    loan_date: new Date("2025-04-20"),
    status: "returned" as const,
  },
  {
    id: "10",
    no: 10,
    tools: "Ladder",
    return_date: new Date("2025-04-28"),
    loan_date: new Date("2025-04-19"),
    status: "overdue" as const,
  },
  {
    id: "11",
    no: 11,
    tools: "Level",
    return_date: new Date("2025-05-03"),
    loan_date: new Date("2025-04-25"),
    status: "borrowed" as const,
  },
  {
    id: "12",
    no: 12,
    tools: "Toolbox",
    return_date: new Date("2025-05-04"),
    loan_date: new Date("2025-04-26"),
    status: "pending" as const,
  },
  {
    id: "13",
    no: 13,
    tools: "Socket Set",
    return_date: new Date("2025-04-26"),
    loan_date: new Date("2025-04-18"),
    status: "returned" as const,
  },
  {
    id: "14",
    no: 14,
    tools: "Allen Wrench Set",
    return_date: new Date("2025-04-30"),
    loan_date: new Date("2025-04-22"),
    status: "overdue" as const,
  },
  {
    id: "15",
    no: 15,
    tools: "Nail Gun",
    return_date: new Date("2025-05-07"),
    loan_date: new Date("2025-04-27"),
    status: "borrowed" as const,
  },
];

const HistoryPage = () => {
  return (
    <>
      <div className="flex-center mt-4">
        <ContainerSearchForm
          name="status"
          categoriesData={categoriesData}
          widthClassName="w-3/4 sm:w-[250px] md:w-auto md:min-w-[250px] lg:min-w-[300px]"
        />
      </div>
      <DataTable columns={historyColumns} data={historyData} />
    </>
  );
};

export default HistoryPage;
