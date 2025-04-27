"use client";

import FormSearch from "@/components/form/form-search";
import { useRouter } from "next/navigation";

interface CategoryOption {
  value: string;
  label: string;
}

interface ContainerSearchFormProps {
  name?: string;
  categoriesData?: CategoryOption[];
  children?: React.ReactNode;
  widthClassName?: string;
}

const ContainerSearchForm = ({
  name = "category",
  categoriesData,
  children,
  widthClassName = "w-3/4 sm:w-[200px] lg:w-[250px]",
}: ContainerSearchFormProps) => {
  const router = useRouter();

  const handleSearch = (search: string, filter: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("search", search.toLowerCase());
    params.set(name, filter);
    if (search === "") params.delete("search");
    if (filter === "") params.delete(name);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="mb-2 flex flex-col items-center justify-between gap-2 sm:flex-row">
      <FormSearch
        name={name}
        isFilterCategory
        onSearch={handleSearch}
        className="w-full justify-center py-2 sm:w-max md:w-full md:justify-start"
        categories={categoriesData}
        widthInput={widthClassName}
      />
      {children}
    </div>
  );
};

export default ContainerSearchForm;
