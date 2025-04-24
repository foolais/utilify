"use client";

import FormSearch from "@/components/form/form-search";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

interface CategoryOption {
  value: string;
  label: string;
}

interface ContainerSearchFormProps {
  categoriesData: CategoryOption[];
}

const ContainerSearchForm = ({ categoriesData }: ContainerSearchFormProps) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleSearch = (search: string, category: string) => {
    console.log(search, category);
  };

  return (
    <div className="mb-2 flex flex-col items-center justify-between gap-2 sm:flex-row">
      <FormSearch
        isFilterCategory
        onSearch={handleSearch}
        className="w-full justify-center py-2 sm:w-max md:w-full md:justify-start"
        categories={categoriesData}
        widthInput="w-3/4 sm:w-[200px] lg:w-[250px]"
      />
      <Button className="flex-center w-3/4 gap-1 sm:w-auto">
        <PlusIcon />
        <span
          className={cn(isCollapsed ? "block" : "block md:hidden lg:block")}
        >
          Add
        </span>
      </Button>
    </div>
  );
};

export default ContainerSearchForm;
