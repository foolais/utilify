"use client";

import FormLogin from "@/components/form/form-login";
import FormRegister from "@/components/form/form-register";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFormLogin, setIsFormLogin] = useState<boolean>(true);

  const handleToggleForm = () => setIsFormLogin((prev) => !prev);

  useEffect(() => {
    document.title = "Auth | Utilify App";
    if (session) {
      if (session.user?.role === "admin") {
        router.push("/admin/dashboard");
      } else if (session.user?.role === "user") {
        router.push("/dashboard");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
