"use client";

import { useState } from "react";
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

interface CategoryOption {
  value: string;
  label: string;
}

interface iFormSearch {
  className?: string;
  isFilterCategory?: boolean;
  onSearch: (searchValue: string, categoryValue: string) => void;
  categories?: CategoryOption[];
}

const FormSearch = ({
  className,
  isFilterCategory,
  categories,
  onSearch,
}: iFormSearch) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4 sm:flex-row",
        className,
      )}
    >
      <Input
        type="text"
        placeholder="Search Here..."
        className="w-3/4 sm:w-[300px] md:w-[400px]"
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
              aria-expanded={open}
              className="w-3/4 justify-between sm:w-[200px] md:w-[300px]"
            >
              {categoryValue ? (
                categories.find((data) => data.value === categoryValue)?.label
              ) : (
                <p className="font-light">Select category</p>
              )}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-3/4 p-0 sm:w-[200px] md:w-[300px]">
            <Command>
              <CommandInput placeholder="Search category..." className="h-9" />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                {categories.map((data) => (
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
        className="w-3/4 sm:w-[100px] md:w-[150px]"
        onClick={() => onSearch?.(searchValue, categoryValue)}
      >
        Search
        <SearchIcon className="h-9" />
      </Button>
    </div>
  );
};

export default FormSearch;
