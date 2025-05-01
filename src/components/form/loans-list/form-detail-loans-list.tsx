import { useEffect, useState } from "react";
import { FormFieldInput } from "../form-field";
import { getLoansById } from "@/lib/actions/actions-loans-list";
import { formatDate } from "@/lib/utils";

interface iFormLoans {
  email: string;
  tools: string;
  loan_date: string;
  return_date: string;
  status: string;
}

const FormDetailLoansList = ({ id }: { id: string }) => {
  const [formValues, setFormValues] = useState<iFormLoans>({
    email: "",
    tools: "",
    loan_date: "",
    return_date: "",
    status: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const loanData = await getLoansById(id);

        if ("error" in loanData) return;

        setFormValues({
          email: loanData.email ?? "",
          tools: loanData.tool.name ?? "",
          loan_date: formatDate(loanData.loan_date),
          return_date: formatDate(loanData.return_date),
          status: loanData.status,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [id]);

  return (
    <form id="form-create-loans">
      <div className="grid w-full items-center gap-4">
        <FormFieldInput
          name="email"
          label="Email"
          value={formValues.email}
          placeholder="Enter email..."
          disabled
        />
        <FormFieldInput
          name="tools"
          label="Tools"
          value={formValues.tools}
          placeholder="Enter tools..."
          disabled
        />
        <FormFieldInput
          name="loan_date"
          label="Loan Date"
          value={formValues.loan_date}
          placeholder="Enter loan date..."
          disabled
        />
        <FormFieldInput
          name="return_date"
          label="Return Date"
          value={formValues.return_date}
          placeholder="Enter return date..."
          disabled
        />
        <FormFieldInput
          name="status"
          label="Status"
          value={formValues.status}
          placeholder="Enter status..."
          disabled
        />
      </div>
    </form>
  );
};

export default FormDetailLoansList;
