"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Title from "@/components/ui/title";
import { registerCredentials } from "@/lib/actions/actions-auth";
import { useActionState, useEffect, useState } from "react";
import { FormFieldInput } from "./form-field";
import { toast } from "sonner";

interface iFormRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const FormRegister = ({ onToggleForm }: { onToggleForm: () => void }) => {
  const [formValues, setFormValues] = useState<iFormRegister>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [state, formAction, isPending] = useActionState(
    registerCredentials,
    null,
  );

  useEffect(() => {
    if (state && state.error) toast.error(state.message, { duration: 1500 });
    else if (state?.success) {
      toast.success(state.message, { duration: 1500 });
      onToggleForm();
    }
  }, [state, onToggleForm]);

  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <Title size="lg" />
        <CardTitle className="auth-title">Create an Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-register" action={formAction}>
          <div className="grid w-full items-center gap-4">
            <FormFieldInput
              name="name"
              label="Name"
              value={(formValues as iFormRegister).name}
              setFormValues={setFormValues}
              error={
                state?.error && "name" in state.error ? state.error.name : []
              }
              placeholder="John Doe"
            />
            <FormFieldInput
              name="email"
              label="Email"
              value={(formValues as iFormRegister).email}
              setFormValues={setFormValues}
              error={
                state?.error && "email" in state.error ? state.error.email : []
              }
              placeholder="johndoe@me.com"
              type="email"
            />
            <FormFieldInput
              name="password"
              label="Password"
              value={(formValues as iFormRegister).password}
              setFormValues={setFormValues}
              error={
                state?.error && "password" in state.error
                  ? state.error.password
                  : []
              }
              placeholder="********"
              type="password"
            />
            <FormFieldInput
              name="confirmPassword"
              label="Confirm Password"
              value={(formValues as iFormRegister).confirmPassword}
              setFormValues={setFormValues}
              error={
                state?.error && "confirmPassword" in state.error
                  ? state.error.confirmPassword
                  : []
              }
              placeholder="********"
              type="password"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="auth-footer">
        <Button className="w-full" form="form-register" disabled={isPending}>
          Register
        </Button>
        <p>
          Already have an account?{" "}
          <Button
            variant="ghost"
            size="sm"
            className="px-1.5"
            onClick={onToggleForm}
            disabled={isPending}
          >
            Sign in
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default FormRegister;
