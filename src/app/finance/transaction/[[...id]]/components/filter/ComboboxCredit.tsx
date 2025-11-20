import { CheckIcon, ChevronDown, PlusCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

import type { ICreditCardByGroupIdQuery } from "@/graphql/types/graphqlTypes";
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
import GroupCreditForm from "@/app/finance/transaction/[[...id]]/components/group/GroupCreditForm";

interface ComboboxCategorieProps {
  children: ReactNode;
  groupId: string;
  credit?: ICreditCardByGroupIdQuery;
  className?: string;
  initialValue?: string;
  onSelect?: (id: string) => void;
}

export default function ComboboxCredit({
  credit,
  children,
  groupId,
  className,
  initialValue,
  onSelect,
}: ComboboxCategorieProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild={true}>
        <button
          type="button"
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-border px-4 text-left font-normal",
            "ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1",
            "focus-visible:ring-neutral-400",
            className
          )}
        >
          {credit?.creditCardByGroupId.find((node) => node._id === value)
            ?.description || children}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command value={initialValue}>
          <CommandInput
            placeholder="Procurar Cartões..."
            className="focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
          />
          <CommandList className="max-h-none overflow-hidden">
            <CommandEmpty>Cartão não encontrado</CommandEmpty>

            <CommandGroup className="border-b">
              <CommandItem>
                <GroupCreditForm
                  groupId={groupId}
                  onCreated={(categoryId) => {
                    setValue(categoryId);
                    onSelect?.(categoryId);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3"
                >
                  <div>
                    <PlusCircleIcon />
                  </div>
                  <span>Criar Cartão</span>
                </GroupCreditForm>
              </CommandItem>
            </CommandGroup>
            <CommandGroup className="max-h-40 overflow-y-auto">
              {credit?.creditCardByGroupId.map((credit) => (
                <CommandItem
                  key={credit._id}
                  value={credit.description}
                  onSelect={() => {
                    const newValue = value === credit._id ? "" : credit._id;

                    setValue(newValue);
                    setOpen(false);

                    onSelect?.(newValue);
                  }}
                >
                  {credit.description}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      value === credit._id ? "opacity-100" : "opacity-0"
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
