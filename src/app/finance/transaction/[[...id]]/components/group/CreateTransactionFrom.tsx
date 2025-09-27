"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  ICategoriesByGroupIdQuery,
  ITransactionsByGroupIdQuery,
  type ITransactionGroupByIdQuery,
} from "@/graphql/types/graphqlTypes";
import { Button } from "@/lib/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/ui/form";
import { Input } from "@/lib/ui/input";
import { defaultCurrencyFormat } from "@/lib/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";
import { cn } from "@/lib/utils/utils";

import type { InternalRefetchQueriesInclude } from "@apollo/client";
import { Checkbox } from "@/lib/ui/checkbox";
import useCreatTransactionSubmit from "@/app/finance/transaction/[[...id]]/components/hooks/useCreatTransactionSubmit";
import DuplicateDescriptionDialog from "@/app/finance/transaction/[[...id]]/components/group/DuplicateDescriptionDialog";
import {
  createTransactionSchema,
  CreateTransactionSchema,
} from "@/utils/transactionsSchema";

import { useCreditCardByGroupIdQuery } from "@/graphql/hooks/graphqlHooks";
import ComboboxCredit from "@/app/finance/transaction/[[...id]]/components/filter/ComboboxCredit";

import { CalendarCn } from "@/lib/ui/calendarCn";
import ComboboxCategories from "@/app/finance/transaction/[[...id]]/components/filter/ComboboxCategories";

interface CreateTransactionFormProps {
  transactionGroup: NonNullable<
    ITransactionGroupByIdQuery["transactionGroupById"]
  >;
  categories: NonNullable<ICategoriesByGroupIdQuery["categoriesByGroupId"]>;
  initialValues?: NonNullable<
    ITransactionsByGroupIdQuery["transactions"]
  >["nodes"][0];
  refetchQueries: InternalRefetchQueriesInclude;
  setOpen?: (open: boolean) => void;
}

export default function CreateTransactionForm({
  transactionGroup,
  categories,
  initialValues,
  refetchQueries,
  setOpen,
}: CreateTransactionFormProps) {
  const [closeAfterSave, setCloseAfterSave] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const form = useForm<CreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      categories: initialValues?.category._id ?? "",
      description: initialValues?.description ?? "",
      date: initialValues?.date ? new Date(initialValues.date) : undefined,
      value: initialValues
        ? defaultCurrencyFormat.format(initialValues.amount)
        : defaultCurrencyFormat.format(0),
      recurring: initialValues
        ? (initialValues.isRecurringPayment ?? false)
        : false,
      credit: initialValues ? initialValues.creditCard?._id : "",
      installment: initialValues ? initialValues.installments?.total : 0,
      installmentCheck: initialValues
        ? (initialValues.installments?.total ?? 0) > 0
        : false,
    },
  });
  const buttons = [
    {
      label: "Salvar",
      type: "submit" as const,
      onClick: () => setCloseAfterSave(false),
    },
    {
      label: "Salvar e Fechar",
      type: "submit" as const,
      onClick: () => setCloseAfterSave(true),
    },
    {
      label: "Fechar",
      type: "button" as const,
      onClick: () => setOpen?.(false),
    },
  ];

  const { data: dataCreditCardByGroupId } = useCreditCardByGroupIdQuery({
    variables: {
      transactionGroupId: transactionGroup._id,
    },
  });
  console.log("@@credito", transactionGroup._id);
  const hasInstallments = form.watch("installmentCheck");

  const { onSubmit } = useCreatTransactionSubmit({
    transactionGroup,
    initialValues,
    refetchQueries,
    onFinished: () => {
      setOpen?.(!closeAfterSave);
    },
    setOpenAlert: (value) => {
      setOpenAlert?.(value);
    },
  });
  return (
    <>
      {openAlert && (
        <DuplicateDescriptionDialog
          onOpenChange={setOpenAlert}
          open={openAlert}
          onSkip={async (value) => {
            onSubmit(form.getValues(), value);
          }}
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => onSubmit(values))}
          className="flex h-dvh flex-col space-y-5 overflow-y-auto p-6 lg:p-0.5 xl:mt-8"
        >
          <div className="flex flex-col gap-4 xl:flex-row">
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="xl:w-72">
                  <FormLabel className="text-secondary-foreground">
                    Categoria
                  </FormLabel>
                  <ComboboxCategories
                    initialValue={initialValues?.category._id}
                    groupId={transactionGroup._id}
                    categories={categories}
                    onSelect={field.onChange}
                    className="flex h-10 w-full items-center justify-between rounded-lg border border-border pl-4"
                  >
                    <span className="text-sm text-muted-foreground">
                      Informe a classificação
                    </span>
                  </ComboboxCategories>
                  <div className="h-4">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary-foreground">
                    Descrição
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className={cn(
                        "h-10 border border-border xl:w-[347px]",
                        "focus-visible:ring-neutral-400"
                      )}
                      placeholder="Preencha com uma descrição"
                      {...field}
                    />
                  </FormControl>
                  <div className="h-4">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 xl:flex-row">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-secondary-foreground">
                    Data
                  </FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild={true}>
                      <button
                        className={cn(
                          "flex h-10 justify-start rounded-md border border-border px-4 py-2 text-left font-normal xl:w-[248px]",
                          !field.value && "text-muted-foreground",
                          "ring-offset-background focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1",
                          "focus-visible:ring-neutral-400"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon size={20} className="ml-auto" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarCn
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <div className="h-4">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="flex w-[196px] flex-col ">
                    <FormLabel className="text-secondary-foreground">
                      Valor
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="currency"
                        className={cn(
                          "h-10 border border-border xl:w-[200px]",
                          "focus-visible:ring-neutral-400"
                        )}
                        placeholder="Informe o valor"
                        {...field}
                      />
                    </FormControl>
                    <div className="h-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recurring"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel></FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center space-x-2">
                        <Checkbox
                          id="terms"
                          className="rounded-[4px] border border-secondary-foreground data-[state=checked]:bg-muted-foreground"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label className="text-sm text-secondary-foreground xl:text-base">
                          Recorrente
                        </label>
                      </div>
                    </FormControl>
                    <div className="h-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full items-center gap-4">
            <FormField
              control={form.control}
              name="credit"
              render={({ field }) => (
                <FormItem className="flex w-full xl:w-[200px] flex-col">
                  <FormLabel className="text-secondary-foreground">
                    Crédito
                  </FormLabel>
                  <FormControl>
                    <ComboboxCredit
                      initialValue={
                        initialValues ? initialValues.creditCard?._id : ""
                      }
                      groupId={transactionGroup._id}
                      credit={dataCreditCardByGroupId}
                      onSelect={field.onChange}
                      className="flex h-10 w-full items-center justify-between rounded-lg border border-border pl-4"
                    >
                      <span className="text-sm text-muted-foreground">
                        Selecione um cartão
                      </span>
                    </ComboboxCredit>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-5 flex h-full items-center gap-2">
              <FormField
                control={form.control}
                name="installmentCheck"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel></FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center space-x-2">
                        <Checkbox
                          id="terms"
                          className="rounded-[4px] border border-secondary-foreground data-[state=checked]:bg-muted-foreground"
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                          }}
                        />
                        <label className="text-sm text-secondary-foreground xl:text-base">
                          Parcelamento
                        </label>
                      </div>
                    </FormControl>
                    <div className="h-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {hasInstallments && (
            <FormField
              control={form.control}
              name="installment"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="text-secondary-foreground">
                    Número de parcelas
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className={cn(
                        "h-10 border border-border xl:w-[200px]",
                        "focus-visible:ring-neutral-400"
                      )}
                      placeholder="Informe o valor"
                      {...field}
                    />
                  </FormControl>
                  <div className="h-4">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          )}
          <div className="flex h-full items-end justify-end gap-2">
            {buttons.map((btn) => (
              <Button
                key={btn.label}
                type={btn.type}
                className={cn(
                  "ring-offset-background focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1",
                  "focus-visible:ring-neutral-400",
                  "w-full text-secondary-foreground xl:w-44"
                )}
                variant="outline"
                onClick={btn.onClick}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </form>
      </Form>
    </>
  );
}
