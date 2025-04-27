import { useEffect, useState } from "react";
import { FormFieldInput } from "../form-field";
import moment from "moment";

interface iFormLoans {
  email: string;
  tools: string;
  loan_date: string;
  return_date: string;
  status: string;
}

const FormDetailLoansList = () => {
  const [formValues, setFormValues] = useState<iFormLoans>({
    email: "",
    tools: "",
    loan_date: "",
    return_date: "",
    status: "",
  });

  useEffect(() => {
    setFormValues({
      email: "mizuki@mizuki.com",
      tools: "Monitor",
      loan_date: "Wed Apr 09 2025 00:00:00 GMT+0700 (Western Indonesia Time)",
      return_date: "Sat Apr 19 2025 00:00:00 GMT+0700 (Western Indonesia Time)",
      status: "available",
    });
  }, []);

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
          value={moment(formValues.loan_date).format("LL")}
          placeholder="Enter loan date..."
          disabled
        />
        <FormFieldInput
          name="return_date"
          label="Return Date"
          value={moment(formValues.return_date).format("LL")}
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
