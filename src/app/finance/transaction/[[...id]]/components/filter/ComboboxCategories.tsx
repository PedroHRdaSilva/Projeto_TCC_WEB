import { CheckIcon, ChevronDown, PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";

import type { ICategoriesByGroupIdQuery } from "@/graphql/types/graphqlTypes";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/lib/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";
import { cn } from "@/lib/utils/utils";

import type { ReactNode } from "react";
import GroupCategoryForm from "@/app/finance/transaction/[[...id]]/components/group/GroupCategoryForm";

interface ComboboxCategorieProps {
  children: ReactNode;
  groupId: string;
  categories: NonNullable<ICategoriesByGroupIdQuery["categoriesByGroupId"]>;
  className?: string;
  initialValue?: string;
  onSelect?: (date: string) => void;
}

export default function ComboboxCategories({
  children,
  groupId,
  categories,
  className,
  initialValue,
  onSelect,
}: ComboboxCategorieProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger
        className={cn(
          "w-full ring-offset-background",
          "focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-600 focus-visible:ring-offset-1",
          "dark:focus-visible:ring-neutral-400",
          className
        )}
      >
        {categories.find((node) => node._id === value)?.description || children}
        <div className="pr-2">
          <ChevronDown className="h-4 w-4 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command value={initialValue}>
          <CommandInput placeholder="Procurar Categorias..." />
          <CommandList className="max-h-none overflow-hidden">
            <CommandEmpty>Categoria nao encontrada</CommandEmpty>
            <CommandGroup className="border-b">
              <CommandItem>
                <GroupCategoryForm
                  groupId={groupId}
                  onCreated={(categoryId) => {
                    setValue(categoryId);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3"
                >
                  <div>
                    <PlusCircleIcon />
                  </div>
                  <span>Criar Categoria</span>
                </GroupCategoryForm>
              </CommandItem>
            </CommandGroup>
            <CommandGroup className="max-h-64 overflow-y-auto">
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.description}
                  onSelect={() => {
                    if (value === category._id) {
                      setValue(undefined);
                      onSelect?.(category._id);
                    } else {
                      setValue(category._id);
                      onSelect?.(category._id);
                    }
                    setOpen(false);
                  }}
                >
                  {category.description}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      value === category._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
