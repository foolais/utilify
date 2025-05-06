"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown, SearchIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

interface CategoryOption {
  value: string;
  label: string;
}

interface iFormSearch {
  name?: string;
  className?: string;
  isFilterCategory?: boolean;
  onSearch: (searchValue: string, categoryValue: string) => void;
  categories?: CategoryOption[];
  widthInput?: string;
}

const FormSearch = ({
  name = "category",
  className,
  isFilterCategory,
  categories,
  onSearch,
  widthInput,
}: iFormSearch) => {
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "";

    setSearchValue(search);
    if (name === "category") {
      const isValidCategory = categories?.some(
        (categoryData) => categoryData.label.toLocaleLowerCase() === category,
      );
      setCategoryValue(isValidCategory ? category : "");
    } else if (name === "status") {
      const isValidStatus = categories?.some(
        (categoryData) => categoryData.label.toLocaleLowerCase() === status,
      );
      setCategoryValue(isValidStatus ? status : "");
    }
  }, [searchParams, name, categories]);

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-4 py-6 sm:flex-row md:gap-2 lg:gap-4",
        className,
      )}
    >
      <Input
        type="text"
        placeholder="Search Here..."
        className={widthInput}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      {/* Filter Category */}
      {isFilterCategory && categories ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-label="Select category"
              aria-expanded={open}
              className={cn("justify-between", widthInput)}
            >
              {categoryValue ? (
                categories.find((data) => data.value === categoryValue)?.label
              ) : (
                <p className="font-light">Select {name}</p>
              )}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn("p-0", widthInput)}>
            <Command>
              <CommandInput placeholder={`Search ${name}...`} className="h-9" />
              <CommandList>
                <CommandEmpty>No {name} found.</CommandEmpty>
                {categories.find((item) => item.value === categoryValue) && (
                  <CommandItem
                    key={categoryValue}
                    value={categoryValue}
                    onSelect={(currentValue) => {
                      setCategoryValue(
                        currentValue === categoryValue ? "" : currentValue,
                      );
                      setOpen(false);
                    }}
                    className="cursor-pointer capitalize"
                  >
                    {categoryValue}
                    <Check
                      className={cn(
                        "ml-auto",
                        categoryValue === categoryValue
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                )}
                {categories
                  .filter((item) => item.value !== categoryValue)
                  .map((data) => (
                    <CommandItem
                      key={data.value}
                      value={data.value}
                      onSelect={(currentValue) => {
                        setCategoryValue(
                          currentValue === categoryValue ? "" : currentValue,
                        );
                        setOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      {data.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          categoryValue === data.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : null}
      {/* Filter Category */}
      <Button
        type="submit"
        className="w-3/4 sm:w-[100px]"
        onClick={() => onSearch?.(searchValue, categoryValue)}
      >
        Search
        <SearchIcon className="h-9" />
      </Button>
    </div>
  );
};

export default FormSearch;
