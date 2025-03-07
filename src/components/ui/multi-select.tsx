
import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export type OptionType = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: OptionType[];
  selected: string[];
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const handleUnselect = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  // Get display labels for the selected values
  const selectedLabels = selected.map((value) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length > 0 ? (
              <div className="flex flex-wrap gap-1 max-w-[90%]">
                {selected.map((value, index) => (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {selectedLabels[index]}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnselect(value);
                      }}
                    />
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {options.map((option) => {
              const isSelected = selected.includes(option.value);
              return (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange(
                      isSelected
                        ? selected.filter((value) => value !== option.value)
                        : [...selected, option.value]
                    );
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
