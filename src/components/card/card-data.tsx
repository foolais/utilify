import React from "react";
import { Card, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface iProps {
  children: React.ReactNode;
  isWithCount?: boolean;
  countData?: string;
  variant?: "primary" | "secondary" | "success" | "warning";
}

const CardData = ({
  children,
  countData,
  isWithCount = true,
  variant = "primary",
}: iProps) => {
  const variantClasses = {
    primary: "border-[1px] border-blue-500",
    secondary: "bg-primary-500 text-white",
    success: "border-[1px] border-green-500",
    warning: "border-[1px] border-yellow-500",
  };

  const separatorClasses = {
    primary: "bg-blue-500",
    secondary: "bg-primary-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
  };

  return (
    <Card className={cn(`flex gap-2 px-4 py-6`, variantClasses[variant])}>
      <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
        {children}
      </CardTitle>
      {isWithCount && (
        <>
          <Separator className={separatorClasses[variant]} />
          <p className="text-xl font-semibold text-gray-950 lg:text-2xl">
            {countData}
          </p>
        </>
      )}
    </Card>
  );
};

export default CardData;
