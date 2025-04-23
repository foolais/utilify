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

interface iFormSearch {
  isFilterCategory?: boolean;
}

const datas = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
];

const FormSearch = ({ isFilterCategory }: iFormSearch) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  return (
    <div className="flex w-full items-center justify-center space-x-2">
      <Input
        type="text"
        placeholder="Search Here..."
        className="max-w-sm"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      {/* Filter Category */}
      {isFilterCategory ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {categoryValue ? (
                datas.find((data) => data.value === categoryValue)?.label
              ) : (
                <p className="font-light">Select category</p>
              )}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search category..." className="h-9" />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                {datas.map((data) => (
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
      <Button type="submit" className="w-[100px]">
        Search
        <SearchIcon className="h-9" />
      </Button>
    </div>
  );
};

export default FormSearch;
