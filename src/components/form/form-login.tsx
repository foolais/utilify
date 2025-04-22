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
import { loginCredentials } from "@/lib/actions/actions-auth";
import { useActionState, useState } from "react";
import { FormFieldInput } from "./form-field";

interface iFormLogin {
  email: string;
  password: string;
}

const FormLogin = ({ onToggleForm }: { onToggleForm: () => void }) => {
  const [formValues, setFormValues] = useState<iFormLogin>({
    email: "",
    password: "",
  });

  const [state, formAction, isPending] = useActionState(loginCredentials, null);

  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <Title size="lg" />
        <CardTitle className="auth-title">Welcome Back</CardTitle>
      </CardHeader>
      <CardContent>
        {/* change to alert */}
        {state?.message ? <p>{state.message}</p> : null}
        <form id="form-login" action={formAction}>
          <div className="grid w-full items-center gap-4">
            <FormFieldInput
              name="email"
              label="Email"
              value={(formValues as iFormLogin).email}
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
              value={(formValues as iFormLogin).password}
              setFormValues={setFormValues}
              error={
                state?.error && "password" in state.error
                  ? state.error.password
                  : []
              }
              placeholder="********"
              type="password"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="auth-footer">
        <Button className="w-full" form="form-login" disabled={isPending}>
          Login
        </Button>
        <p>
          Don&apos;t have an account?{" "}
          <Button
            variant="ghost"
            size="sm"
            className="px-1.5"
            onClick={onToggleForm}
          >
            Sign up
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default FormLogin;
