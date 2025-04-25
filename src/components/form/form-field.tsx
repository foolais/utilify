"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState } from "react";

interface iPropsInput<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: string[];
  value: string;
  setFormValues?: React.Dispatch<React.SetStateAction<T>>;
}

export const FormFieldInput = <T,>({
  name,
  label,
  error,
  value,
  setFormValues,
  ...rest
}: iPropsInput<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues?.((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name as string}>{label}</Label>
      <Input
        id={name as string}
        name={name as string}
        value={value}
        onChange={handleChange}
        {...rest}
      />
      {error && (
        <div aria-live="polite" aria-atomic="true">
          <span className="error-message">{error.join(" & ")}</span>
        </div>
      )}
    </div>
  );
};

type SelectData = {
  value: string;
  label: string;
};

interface ComboboxProps {
  name: string;
  label: string;
  placeholder: string;
  data: SelectData[];
  value: string;
  setValue: (value: string) => void;
  onChangeForm: (value: string) => void;
  error?: string[];
}

export const FormFieldCombobox = ({
  name,
  label,
  placeholder,
  data,
  value,
  setValue,
  onChangeForm,
  error,
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col space-y-1.5">
      <Label>{label}</Label>
      <input type="hidden" name={name} value={value} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? (
              data.find((item) => item.value === value)?.label
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[375px] p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${label.toLowerCase()}...`}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              {data.map((item) => (
                <CommandItem
                  id={name as string}
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    onChangeForm(newValue);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && (
        <div aria-live="polite" aria-atomic="true">
          <span className="error-message">{error.join(" & ")}</span>
        </div>
      )}
    </div>
  );
};
