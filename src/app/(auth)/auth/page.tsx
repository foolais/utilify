"use client";

import FormLogin from "@/components/form/form-login";
import FormRegister from "@/components/form/form-register";
import { useState } from "react";

const AuthPage = () => {
  const [isFormLogin, setIsFormLogin] = useState<boolean>(true);

  const handleToggleForm = () => setIsFormLogin((prev) => !prev);

  return (
    <div className="flex-center h-dvh">
      <div>
        {isFormLogin ? (
          <FormLogin onToggleForm={handleToggleForm} />
        ) : (
          <FormRegister onToggleForm={handleToggleForm} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
