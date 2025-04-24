"use client";

import FormSearch from "@/components/form/form-search";

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
  const handleSearch = (search: string, category: string) => {
    console.log(search, category);
  };

  return (
    <div>
      <FormSearch
        isFilterCategory
        onSearch={handleSearch}
        className="justify-center md:justify-start"
        categories={categoriesData}
        widthInput="w-3/4 sm:w-[200px] lg:w-[250px]"
      />
    </div>
  );
};

export default ContainerSearchForm;
