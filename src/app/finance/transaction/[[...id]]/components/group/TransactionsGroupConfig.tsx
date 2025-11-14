"use client";

import { Settings2Icon } from "lucide-react";
import { useState } from "react";

import type { ITransactionGroupByIdQuery } from "@/graphql/types/graphqlTypes";
import { useViewer } from "@/lib/auth/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/ui/tabs";

import { cn } from "@/lib/utils/utils";
import TransactionGroupForm from "@/app/finance/transaction/[[...id]]/components/group/TransactionGroupForm";
import GroupCategoryForm from "@/app/finance/transaction/[[...id]]/components/group/GroupCategoryForm";
import { Separator } from "@/lib/ui/separator";
import GroupCreditForm from "@/app/finance/transaction/[[...id]]/components/group/GroupCreditForm";
import CreditTable from "@/app/finance/transaction/[[...id]]/components/group/CreditTable";
import CategoryTable from "@/app/finance/transaction/[[...id]]/components/group/CategoryTable";

interface TransactionGroupConfigProps {
  children: React.ReactNode;
  initialValues?: ITransactionGroupByIdQuery["transactionGroupById"];
}

export default function TransactionGroupConfig({
  children,
  initialValues,
}: TransactionGroupConfigProps) {
  const [open, setOpen] = useState(false);
  const viewer = useViewer();

  const isAdm = initialValues?.owner._id === viewer?._id;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-6xl ">
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

        <Tabs defaultValue="GROUP_CONFIG" className="h-[447px] gap-8 lg:flex">
          {initialValues && (
            <TabsList
              className={cn(
                "scrollbar-none mb-4 flex w-auto shrink-0 justify-start gap-2 overflow-x-auto bg-background p-0",
                "lg:mb-0 lg:flex lg:shrink lg:flex-col lg:overflow-visible"
              )}
            >
              {[
                { value: "GROUP_CONFIG", label: "Visão Geral" },
                { value: "CATEGORY_CONFIG", label: "Gerenciar Categorias" },
                { value: "CREDIT_CONFIG", label: "Gerenciar Cartões" },
              ].map(({ value, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="w-full justify-start rounded-md border border-border px-4 py-2 data-[state=active]:bg-secondary lg:border-none"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          )}

          <div className="w-full">
            <TabsContent
              value="GROUP_CONFIG"
              className="flex w-full flex-col gap-4 lg:mt-0"
            >
              {initialValues && (
                <div className="hidden lg:flex lg:flex-col">
                  <p className="text-sm font-medium text-foreground">
                    Visão Geral
                  </p>
                  <span className="text-sm text-muted-foreground">
                    Configurações gerais do grupo
                  </span>
                </div>
              )}

              <div className="h-[calc(100dvh-208px)] overflow-hidden lg:h-96">
                <div className="h-full overflow-y-auto pr-2">
                  <TransactionGroupForm
                    initialValues={initialValues}
                    setOpen={setOpen}
                  />
                </div>
              </div>
            </TabsContent>

            {initialValues && (
              <TabsContent
                value="CATEGORY_CONFIG"
                className="flex w-full flex-col gap-4 lg:mt-0"
              >
                <div className="flex items-center justify-between">
                  <div className="hidden lg:flex lg:flex-col">
                    <p className="text-sm font-medium text-foreground">
                      Categorias
                    </p>
                    <span className="text-sm text-muted-foreground">
                      Classifique as transações do grupo
                    </span>
                  </div>
                  <div className={cn(!isAdm && "hidden")}>
                    <GroupCategoryForm
                      groupId={initialValues._id}
                      className={cn(
                        "h-10 border border-input bg-background px-4 py-2",
                        "inline-flex select-none items-center justify-center whitespace-nowrap",
                        "rounded-md text-sm font-medium ring-offset-background transition-colors",
                        "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      Nova Categoria
                    </GroupCategoryForm>
                  </div>
                </div>
                <Separator />

                <div className="h-[350px] overflow-y-auto lg:h-96">
                  <CategoryTable groupId={initialValues._id} />
                </div>
              </TabsContent>
            )}
            {initialValues && (
              <TabsContent
                value="CREDIT_CONFIG"
                className="flex w-full flex-col gap-4 lg:mt-0"
              >
                <div className="flex items-center justify-between">
                  <div className="hidden lg:flex lg:flex-col">
                    <p className="text-sm font-medium text-foreground">
                      Cartões
                    </p>
                    <span className="text-sm text-muted-foreground">
                      Cartões cadastrados no grupo
                    </span>
                  </div>
                  <div className={cn(!isAdm && "hidden")}>
                    <GroupCreditForm
                      groupId={initialValues._id}
                      className={cn(
                        "h-10 border border-input bg-background px-4 py-2",
                        "inline-flex select-none items-center justify-center whitespace-nowrap",
                        "rounded-md text-sm font-medium ring-offset-background transition-colors",
                        "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      Novo Cartão
                    </GroupCreditForm>
                  </div>
                </div>

                <Separator />

                <div className="h-[calc(100dvh-208px)] overflow-hidden lg:h-96">
                  <CreditTable groupId={initialValues._id} />
                </div>
              </TabsContent>
            )}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
