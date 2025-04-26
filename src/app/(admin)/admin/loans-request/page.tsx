import ContainerSearchForm from "@/components/container/container-search-form";
import { DataTable } from "@/components/table/data-table";
import { loansRequestColumns } from "@/components/table/loan-request.tsx/loans-request-columns";

const loansRequestData = [
  {
    id: "1",
    no: "1",
    email: "john.doe@example.com",
    tools: "Projector X1",
    loan_date: new Date("2025-04-01T10:00:00Z"),
    return_date: new Date("2025-04-05T15:00:00Z"),
  },
  {
    id: "2",
    no: "2",
    email: "jane.smith@example.com",
    tools: "Finance Laptop A",
    loan_date: new Date("2025-03-25T09:30:00Z"),
    return_date: new Date("2025-03-29T16:45:00Z"),
  },
  {
    id: "3",
    no: "3",
    email: "alex.chan@example.com",
    tools: "Analytics Tablet",
    loan_date: new Date("2025-04-10T13:15:00Z"),
    return_date: new Date("2025-04-15T11:00:00Z"),
  },
  {
    id: "4",
    no: "4",
    email: "lisa.nguyen@example.com",
    tools: "Service Camera",
    loan_date: new Date("2025-04-12T08:45:00Z"),
    return_date: new Date("2025-04-14T12:00:00Z"),
  },
  {
    id: "5",
    no: "5",
    email: "mike.jordan@example.com",
    tools: "HR Headset",
    loan_date: new Date("2025-04-02T14:00:00Z"),
    return_date: new Date("2025-04-06T10:00:00Z"),
  },
  {
    id: "6",
    no: "6",
    email: "tina.liu@example.com",
    tools: "Management Monitor",
    loan_date: new Date("2025-04-09T12:00:00Z"),
    return_date: new Date("2025-04-13T18:00:00Z"),
  },
  {
    id: "7",
    no: "7",
    email: "kevin.ramirez@example.com",
    tools: "Analytics Keyboard",
    loan_date: new Date("2025-04-01T07:30:00Z"),
    return_date: new Date("2025-04-07T09:30:00Z"),
  },
  {
    id: "8",
    no: "8",
    email: "nadia.hassan@example.com",
    tools: "Finance Scanner",
    loan_date: new Date("2025-03-30T11:15:00Z"),
    return_date: new Date("2025-04-03T15:15:00Z"),
  },
  {
    id: "9",
    no: "9",
    email: "brian.lee@example.com",
    tools: "Service Microphone",
    loan_date: new Date("2025-04-14T10:30:00Z"),
    return_date: new Date("2025-04-18T14:30:00Z"),
  },
  {
    id: "10",
    no: "10",
    email: "diana.perez@example.com",
    tools: "Management Laptop",
    loan_date: new Date("2025-04-05T13:00:00Z"),
    return_date: new Date("2025-04-09T17:00:00Z"),
  },
  {
    id: "11",
    no: "11",
    email: "felix.morris@example.com",
    tools: "Analytics Drone",
    loan_date: new Date("2025-04-07T09:00:00Z"),
    return_date: new Date("2025-04-12T10:00:00Z"),
  },
  {
    id: "12",
    no: "12",
    email: "sarah.connor@example.com",
    tools: "HR Tablet",
    loan_date: new Date("2025-04-03T15:00:00Z"),
    return_date: new Date("2025-04-07T10:30:00Z"),
  },
  {
    id: "13",
    no: "13",
    email: "liam.carter@example.com",
    tools: "Service Speaker",
    loan_date: new Date("2025-04-06T11:45:00Z"),
    return_date: new Date("2025-04-10T13:30:00Z"),
  },
  {
    id: "14",
    no: "14",
    email: "emily.wong@example.com",
    tools: "Finance Desktop",
    loan_date: new Date("2025-04-11T08:00:00Z"),
    return_date: new Date("2025-04-14T16:00:00Z"),
  },
  {
    id: "15",
    no: "15",
    email: "josh.brown@example.com",
    tools: "HR Webcam",
    loan_date: new Date("2025-04-08T10:00:00Z"),
    return_date: new Date("2025-04-12T09:00:00Z"),
  },
];

const LoanRequest = () => {
  return (
    <div>
      <ContainerSearchForm widthClassName="w-3/4 sm:w-[300px] lg:w-[400px]">
        <div></div>
      </ContainerSearchForm>
      <DataTable columns={loansRequestColumns} data={loansRequestData} />
    </div>
  );
};

export default LoanRequest;
