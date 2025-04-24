"use client";

import { useState } from "react";
import FormSearch from "../form/form-search";
import CardUtil from "../card/card-util";

interface iCardUtil {
  name: string;
  description: string;
  category: string;
}

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

const ContainerCardUtil = ({ data }: { data: iCardUtil[] }) => {
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (search: string, category: string) => {
    const lowerSearch = search.toLowerCase();
    const results = data.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(lowerSearch);
      const matchCategory =
        category === "" ||
        item.category.toLowerCase() === category.toLowerCase();

      console.log(matchSearch, matchCategory);

      return matchSearch && matchCategory;
    });
    setFilteredData(results);
  };

  return (
    <>
      <FormSearch
        isFilterCategory
        onSearch={handleSearch}
        className="justify-center"
        categories={categoriesData}
        widthInput="w-3/4 sm:w-[250px] md:w-auto md:min-w-[250px] lg:min-w-[300px]"
      />
      {filteredData.length === 0 && (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-xl font-bold">Data Not Found</p>
        </div>
      )}
      <div className="grid max-h-[700px] grid-cols-2 gap-4 overflow-y-auto md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filteredData.map((item, index) => (
          <CardUtil
            key={index}
            name={item.name}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </>
  );
};

export default ContainerCardUtil;
