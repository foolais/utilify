"use client";

import FormSearch from "@/components/form/form-search";

interface CategoryOption {
  value: string;
  label: string;
}

interface ContainerSearchFormProps {
  name?: string;
  categoriesData?: CategoryOption[];
  children?: React.ReactNode;
  widthClassName?: string;
  handleSearch?: (search: string, category: string) => void;
}

const ContainerSearchForm = ({
  name = "category",
  categoriesData,
  children,
  widthClassName = "w-3/4 sm:w-[200px] lg:w-[250px]",
  handleSearch = () => {},
}: ContainerSearchFormProps) => {
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
