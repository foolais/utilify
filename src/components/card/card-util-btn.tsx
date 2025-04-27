"use client";

import { useState } from "react";
import DialogForm from "../dialog/dialog-form";
import { Button } from "../ui/button";
import FormCreateLoansRequest from "../form/loans-request/form-create-loans-request";

const CardUtilBtn = ({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Request a Loan</Button>
      <DialogForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Request a Loan"
        description="Please fill in the form below to make a loan."
      >
        <FormCreateLoansRequest
          id={id}
          name={name}
          description={description}
          onCloseDialog={() => setIsOpen(false)}
        />
      </DialogForm>
    </>
  );
};

export default CardUtilBtn;
