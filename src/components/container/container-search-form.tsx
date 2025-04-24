"use client";

import FormSearch from "@/components/form/form-search";

interface CategoryOption {
  value: string;
  label: string;
}

interface ContainerSearchFormProps {
  categoriesData: CategoryOption[];
  children?: React.ReactNode;
}

const ContainerSearchForm = ({
  categoriesData,
  children,
}: ContainerSearchFormProps) => {
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
      {children}
    </div>
  );
};

export default ContainerSearchForm;
