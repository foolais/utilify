"use client";

import FormSearch from "@/components/form/form-search";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

const categoriesData = [
  {
    value: "management",
    label: "Management",
  },
  {
    value: "analytics",
    label: "Analytics",
  },
  {
    value: "service",
    label: "Service",
  },
  {
    value: "finance",
    label: "Finance",
  },
  {
    value: "hr",
    label: "HR",
  },
];

const ContainerSearchForm = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleSearch = (search: string, category: string) => {
    console.log(search, category);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
      <FormSearch
        isFilterCategory
        onSearch={handleSearch}
        className="w-full justify-center py-4 sm:w-max md:w-full md:justify-start"
        categories={categoriesData}
        widthInput="w-3/4 sm:w-[200px] lg:w-[250px]"
      />
      <Button className="flex-center w-3/4 gap-1 sm:w-auto">
        <PlusIcon />
        <span className={cn(isCollapsed ? "block" : "hidden lg:block")}>
          Add
        </span>
      </Button>
    </div>
  );
};

export default ContainerSearchForm;
