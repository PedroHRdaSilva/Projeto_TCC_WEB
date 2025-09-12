"use client";

import TransactionGroupForm from "@/app/finance/transaction/[[...id]]/components/group/TransactionGroupForm";
import { ITransactionGroupByIdQuery } from "@/graphql/types/graphqlTypes";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/ui/dialog";

import { Settings2Icon } from "lucide-react";
import { useState } from "react";
interface TransactionGroupConfigProps {
  children: React.ReactNode;
  initialValues?: ITransactionGroupByIdQuery["transactionGroupById"];
}
export default function TransactionsGroupConfig({
  children,
  initialValues,
}: TransactionGroupConfigProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild={true}>{children}</DialogTrigger>
        <DialogContent className="flex flex-col sm:max-w-3xl h-80">
          <DialogHeader className="flex h-fit w-full flex-row items-center space-x-1.5 space-y-0 border-b border-border pb-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-secondary">
              <Settings2Icon
                className="text-foreground"
                size={20}
                absoluteStrokeWidth={true}
                strokeWidth={2}
              />
            </div>

            <div className="flex flex-col text-left">
              <DialogTitle className="text-sm text-foreground">
                {initialValues ? "Configurações" : "Novo grupo"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {initialValues
                  ? "Altere os dados do grupo"
                  : "Configurações do grupo"}
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="h-[calc(100dvh-208px)] overflow-hidden lg:h-96">
            <div className="h-full overflow-y-auto pr-2">
              <TransactionGroupForm
                initialValues={initialValues}
                setOpen={setOpen}
              />
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
