"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TagIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import type { ICreditCardByGroupIdQuery } from "@/graphql/types/graphqlTypes";

import { Button } from "@/lib/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/ui/form";
import { defaultCurrencyFormat, Input } from "@/lib/ui/input";
import useCreditActions from "@/app/finance/transaction/[[...id]]/components/hooks/useCreditActions";
import CreditCardByGroupIdQuery from "@/graphql/queries/transactions/CreditCardByGroupIdQuery";
import parseCurrencyToNumber from "@/utils/currency";
import { cn } from "@/lib/utils";

interface GroupCreditFormProps {
  children: ReactNode;
  groupId: string;
  className?: string;
  initialValues?: ICreditCardByGroupIdQuery["creditCardByGroupId"][0];
  onCreated?: (onCreated: string) => void;
}

export default function GroupCreditForm({
  children,
  groupId,
  className,
  initialValues,
  onCreated,
}: GroupCreditFormProps) {
  const { refresh } = useRouter();
  const { createCredit, updateCredit, isLoading } = useCreditActions();
  const [open, setOpen] = useState(false);

  const form = useForm<GroupCreditFormSchema>({
    mode: "onChange",
    resolver: zodResolver(groupCreditFormSchema),
    defaultValues: {
      description: initialValues?.description || "",
      limit: initialValues
        ? defaultCurrencyFormat.format(initialValues.limit)
        : defaultCurrencyFormat.format(0),
      validity: initialValues?.validity || "",
    },
  });

  async function handleSubmit(data: GroupCreditFormSchema) {
    if (initialValues) {
      toast.promise(
        updateCredit({
          variables: {
            id: initialValues._id,
            input: {
              description: data.description,
              transactionGroupId: groupId,
              limit: parseCurrencyToNumber(data.limit),
              validity: data.validity,
            },
          },
          refetchQueries: [
            {
              query: CreditCardByGroupIdQuery,
              variables: {
                transactionGroupId: groupId,
              },
            },
          ],
          awaitRefetchQueries: true,
        }),
        {
          position: "top-center",
          loading: "Atualizando cartão...",
          success: "Cartão atualizado com sucesso!",
          error: "Erro ao atualizar o cartão.",
        }
      );
    } else {
      toast.promise(
        createCredit({
          variables: {
            input: {
              description: data.description,
              transactionGroupId: groupId,
              limit: parseCurrencyToNumber(data.limit),
              validity: data.validity,
            },
          },
          refetchQueries: [
            {
              query: CreditCardByGroupIdQuery,
              variables: {
                transactionGroupId: groupId,
              },
            },
          ],
          awaitRefetchQueries: true,
        }).then((res) => {
          const newId = res.data?.createCreditCard._id;
          onCreated?.(newId);
          return res;
        }),
        {
          position: "top-center",
          loading: "Criando cartão...",
          success: "Cartão criado com sucesso!",
          error: {
            message: "Erro ao criar o cartão.",
          },
        }
      );
      setOpen(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={className}>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader className="flex h-fit w-full flex-row items-center space-x-1.5 space-y-0 border-b border-border pb-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-background">
            <TagIcon
              className="text-foreground"
              size={20}
              absoluteStrokeWidth={true}
              strokeWidth={2}
            />
          </div>

          <div className="flex flex-col text-left">
            <DialogTitle className="text-sm text-foreground">
              {initialValues ? "Editar cartão" : "Novo cartão"}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {initialValues
                ? "Altere os dados do cartao"
                : "Crie um cartão personalizado"}
            </DialogDescription>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1">
                  <FormLabel className="text-sm text-muted-foreground">
                    Descrição
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite a descrição do cartão"
                      {...field}
                    />
                  </FormControl>
                  <span className="h-4">
                    <FormMessage />
                  </span>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="limit"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1 w-[196px]">
                  <FormLabel className="text-sm text-muted-foreground">
                    Limite
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="currency"
                      className={cn("h-10 border border-border xl:w-[200px]")}
                      placeholder="Informe o valor"
                      {...field}
                    />
                  </FormControl>
                  <span className="h-4">
                    <FormMessage />
                  </span>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="validity"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1 w-[196px]">
                  <FormLabel className="text-sm text-muted-foreground">
                    Validade
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      maxLength={5}
                      placeholder="MM/AA"
                      className={cn("h-10 border border-border xl:w-[200px]")}
                      value={field.value || ""}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length >= 3) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <span className="h-4">
                    <FormMessage />
                  </span>
                </FormItem>
              )}
            />

            <div className="flex w-full justify-end">
              <Button type="submit" className="w-36 gap-3" variant="outline">
                {isLoading ? "Aguarde..." : "Salvar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export const groupCreditFormSchema = z.object({
  description: z
    .string("Nome do cartão é obrigatório")
    .min(4, "O nome do cartão deve conter no mínimo 4 caracteres"),
  limit: z.string("Valor obrigatório").refine((value) => {
    const amountNormalized = parseCurrencyToNumber(value);
    return amountNormalized > 0;
  }, "O valor deve ser maior que 0"),
  validity: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato inválido (MM/AA)"),
});

export type GroupCreditFormSchema = z.infer<typeof groupCreditFormSchema>;
