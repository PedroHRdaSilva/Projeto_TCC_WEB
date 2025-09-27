"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TagIcon, TrophyIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import type { ICategoriesByGroupIdQuery } from "@/graphql/types/graphqlTypes";
import { ITransactionCategoryTypeEnum } from "@/graphql/types/graphqlTypes";

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

import { arrayOfPossibleIcons, hexToRgba } from "@/lib/utils/utils";
import { Label } from "@/lib/ui/label";
import { PopoverChangeIcon } from "@/app/finance/transaction/[[...id]]/components/group/PopoverChangeIcon";
import { RadioGroup, RadioGroupItem } from "@/lib/ui/radioGroup";
import useCategoryActions from "@/app/finance/transaction/[[...id]]/components/hooks/useCategoryActions";
import CategoriesByGroupIdQuery from "@/graphql/queries/transactions/CategoriesByGroupIdQuery";

interface GroupCategoryFormProps {
  children: ReactNode;
  groupId: string;
  className?: string;
  initialValues?: ICategoriesByGroupIdQuery["categoriesByGroupId"][0];
  onCreated?: (onCreated: string) => void;
}

export default function GroupCategoryForm({
  children,
  groupId,
  className,
  initialValues,
  onCreated,
}: GroupCategoryFormProps) {
  const { createCategory, updateCategory, isLoading } = useCategoryActions();
  const [open, setOpen] = useState(false);

  const form = useForm<GroupCategoryFormSchema>({
    mode: "onChange",
    resolver: zodResolver(groupCategoryFormSchema),
    defaultValues: {
      iconProperties: initialValues?.iconProperties || {
        background: "#fb923c",
        color: "#ffffff",
        icon: "Trophy",
      },
      description: initialValues?.description || "",
      type: initialValues?.type,
    },
  });

  async function handleSubmit(data: GroupCategoryFormSchema) {
    if (initialValues) {
      toast.promise(
        updateCategory({
          variables: {
            id: initialValues._id,
            input: {
              description: data.description,
              iconProperties: data.iconProperties,
              type: data.type as ITransactionCategoryTypeEnum,
              transactionGroupId: groupId,
              categoryDefaultId: initialValues.isDefault
                ? initialValues._id
                : null,
            },
          },
        }),
        {
          position: "top-center",
          loading: "Atualizando categoria...",
          success: "Categoria atualizado com sucesso!",
          error: "Erro ao atualizar a gategoria.",
        }
      );
    } else {
      toast.promise(
        createCategory({
          variables: {
            input: {
              description: data.description,
              iconProperties: data.iconProperties,
              type: data.type as ITransactionCategoryTypeEnum,
              transactionGroupId: groupId,
              categoryDefaultId: null,
            },
          },
          refetchQueries: [
            {
              query: CategoriesByGroupIdQuery,
              variables: {
                transactionGroupId: groupId,
              },
            },
          ],
          awaitRefetchQueries: true,
        }).then((res) => {
          const newId = res.data?.createCategory._id;
          onCreated?.(newId);
          return res;
        }),
        {
          loading: "Criando a categoria...",
          success: "Caegoria criado com sucesso!",
          error: "Erro ao criar a Categoria.",
        }
      );
    }
    setOpen(false);
  }

  const iconProperties = form.watch("iconProperties");
  const IconComponent =
    arrayOfPossibleIcons.find(
      (node) => node.displayName === iconProperties.icon
    ) || TrophyIcon;

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
              {initialValues ? "Editar categoria" : "Novo categoria"}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {initialValues
                ? "Altere os dados da categoria"
                : "Crie uma categoria personalizada"}
            </DialogDescription>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <div className="flex select-none gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-muted-foreground">
                      Tipo da transação
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col lg:flex-row"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={ITransactionCategoryTypeEnum.EARNINGS}
                            id={ITransactionCategoryTypeEnum.EARNINGS}
                          />
                          <Label
                            htmlFor={ITransactionCategoryTypeEnum.EARNINGS}
                            className="text-sm text-foreground"
                          >
                            Receita
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={ITransactionCategoryTypeEnum.EXPENSES}
                            id={ITransactionCategoryTypeEnum.EXPENSES}
                          />
                          <Label
                            htmlFor={ITransactionCategoryTypeEnum.EXPENSES}
                            className="text-sm text-foreground"
                          >
                            Despesa
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="iconProperties"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-muted-foreground">
                      Ícone
                    </FormLabel>
                    <FormControl>
                      <PopoverChangeIcon
                        onChange={field.onChange}
                        iconProperties={iconProperties}
                      >
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg opacity-70"
                          style={{
                            backgroundColor: hexToRgba(
                              iconProperties.background,
                              0.2
                            ),
                          }}
                        >
                          <IconComponent
                            size={24}
                            style={{ color: iconProperties.color }}
                          />
                        </div>
                      </PopoverChangeIcon>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                          placeholder="Digite a descrição da categoria"
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

export const groupCategoryFormSchema = z.object({
  iconProperties: z.object({
    background: z.string(),
    color: z.string(),
    icon: z.string(),
  }),
  description: z
    .string()
    .min(4, "O nome do grupo deve conter no mínimo 4 caracteres"),
  type: z
    .enum([
      ITransactionCategoryTypeEnum.EARNINGS,
      ITransactionCategoryTypeEnum.EXPENSES,
    ])
    .optional(),
});

export type GroupCategoryFormSchema = z.infer<typeof groupCategoryFormSchema>;
