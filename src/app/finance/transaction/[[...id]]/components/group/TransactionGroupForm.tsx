"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TrophyIcon } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { arrayOfPossibleIcons, hexToRgba } from "@/lib/utils/utils";
import useGroupActions from "@/app/finance/transaction/[[...id]]/components/hooks/useGroupActions";
import { ITransactionGroupByIdQuery } from "@/graphql/types/graphqlTypes";
import { PopoverChangeIcon } from "@/app/finance/transaction/[[...id]]/components/group/PopoverChangeIcon";
import { InternalRefetchQueriesInclude } from "@apollo/client";

interface TransactionGroupFormProps {
  initialValues?: ITransactionGroupByIdQuery["transactionGroupById"];
  setOpen: (open: boolean) => void;
  refetchQueries?: InternalRefetchQueriesInclude;
}

export const transactionGroupFormSchema = z.object({
  iconProperties: z.object({
    background: z.string(),
    color: z.string(),
    icon: z.string(),
  }),
  group: z
    .string()
    .min(4, "O nome do grupo deve conter no mínimo 4 caracteres"),
});

export type TransactionGroupFormSchema = z.infer<
  typeof transactionGroupFormSchema
>;

export default function TransactionGroupForm({
  initialValues,
  setOpen,
  refetchQueries,
}: TransactionGroupFormProps) {
  const isCreating = !initialValues;

  const params = useMemo(
    () => ({
      isCreating,
      _id: initialValues?._id,
      refetchQueries,
    }),
    [isCreating, initialValues, refetchQueries]
  );

  const { onSubmit } = useGroupActions(params);

  const form = useForm<TransactionGroupFormSchema>({
    mode: "onChange",
    resolver: zodResolver(transactionGroupFormSchema),
    defaultValues: {
      iconProperties: initialValues?.iconProperties || {
        background: "#fb923c",
        color: "#ffffff",
        icon: "Trophy",
      },
      group: initialValues?.description || "",
    },
  });

  const handleSubmit = async (data: TransactionGroupFormSchema) => {
    console.log(data);
    await onSubmit(data);
    if (isCreating) setOpen(false);
  };

  const iconProperties = form.watch("iconProperties");
  const IconComponent =
    arrayOfPossibleIcons.find(
      (node) => node.displayName === iconProperties.icon
    ) || TrophyIcon;

  return (
    <Form {...form}>
      <div className="flex flex-col gap-6 pb-6">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <FormField
              control={form.control}
              name="iconProperties"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-2">
                  <FormLabel className="text-sm text-muted-foreground">
                    Ícone
                  </FormLabel>
                  <FormControl>
                    <PopoverChangeIcon
                      onChange={field.onChange}
                      iconProperties={iconProperties}
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-lg border border-border transition hover:bg-muted cursor-pointer"
                        style={{
                          backgroundColor: hexToRgba(
                            iconProperties.background,
                            0.2
                          ),
                        }}
                      >
                        <IconComponent
                          size={26}
                          style={{ color: iconProperties.color }}
                        />
                      </div>
                    </PopoverChangeIcon>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-1 flex-col w-full">
              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm text-muted-foreground">
                      Nome do grupo
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Digite o nome do grupo"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end mt-2 pt-4">
            <Button type="submit" className="w-32 gap-2" variant="outline">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
