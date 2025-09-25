"use client";

import { PenLineIcon } from "lucide-react";
import { useState } from "react";

import type {
  ICategoriesByGroupIdQuery,
  ITransactionGroupByIdQuery,
  ITransactionsByGroupIdQuery,
} from "@/graphql/types/graphqlTypes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/lib/ui/sheet";

import type { InternalRefetchQueriesInclude } from "@apollo/client";
import CreateTransactionForm from "@/app/finance/transaction/[[...id]]/components/group/CreateTransactionFrom";

interface CreateTransactionProps {
  children?: React.ReactNode;
  transactionGroup: NonNullable<
    ITransactionGroupByIdQuery["transactionGroupById"]
  >;
  // categories: NonNullable<ICategoriesByGroupIdQuery["categoriesByGroupId"]>;
  initialValues?: NonNullable<
    ITransactionsByGroupIdQuery["transactions"]
  >["nodes"][0];
  refetchQueries: InternalRefetchQueriesInclude;
}

export default function CreateTransaction({
  children,
  transactionGroup,
  // categories,
  initialValues,
  refetchQueries,
}: CreateTransactionProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col p-0 sm:max-w-2xl lg:p-6">
        <SheetHeader className="border-b border-border">
          <div className="flex py-4 pl-6 lg:py-0 lg:pl-0">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border bg-secondary">
              <PenLineIcon size={24} />
            </div>
            <div className="pl-2">
              <SheetTitle className="text-start text-sm text-secondary-foreground">
                {initialValues ? "Alterar Transação" : "Nova Transação"}
              </SheetTitle>
              <SheetDescription className="text-sm text-secondary-foreground">
                Preencha as informações
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <CreateTransactionForm
          refetchQueries={refetchQueries}
          transactionGroup={transactionGroup}
          // categories={categories}
          initialValues={initialValues}
          setOpen={(value) => setOpen(value)}
        />
      </SheetContent>
    </Sheet>
  );
}
