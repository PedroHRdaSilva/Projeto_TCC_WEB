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
import { Input } from "@/lib/ui/input";
import useCreditActions from "@/app/finance/transaction/[[...id]]/components/hooks/useCreditActions";
import CreditCardByGroupIdQuery from "@/graphql/queries/transactions/CreditCardByGroupIdQuery";

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
          <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-secondary">
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
            <div className="flex select-none gap-4">
              <div className="flex flex-1 flex-col">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
    .string("Nome do cartao é obrigatório")
    .min(4, "O nome do cartao deve conter no mínimo 4 caracteres"),
});

export type GroupCreditFormSchema = z.infer<typeof groupCreditFormSchema>;
