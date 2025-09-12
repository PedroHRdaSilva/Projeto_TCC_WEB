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
import { useViewer } from "@/lib/auth/AuthContext";
import { ITransactionGroupByIdQuery } from "@/graphql/types/graphqlTypes";
import { PopoverChangeIcon } from "@/app/finance/transaction/[[...id]]/components/group/PopoverChangeIcon";

interface TransactionGroupFormProps {
  initialValues?: ITransactionGroupByIdQuery["transactionGroupById"];
  setOpen: (open: boolean) => void;
}

export default function TransactionGroupForm({
  initialValues,
  setOpen,
}: TransactionGroupFormProps) {
  const isCreating = !initialValues;

  const params = useMemo(
    () => ({
      isCreating,
      _id: initialValues?._id,
    }),
    [isCreating, initialValues]
  );

  const { loading, onSubmit } = useGroupActions(params);

  const handleSubmit = async (data: TransactionGroupFormSchema) => {
    await onSubmit(data);
    if (isCreating) {
      setOpen(false);
    }
  };

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

  const iconProperties = form.watch("iconProperties");
  const IconComponent =
    arrayOfPossibleIcons.find(
      (node) => node.displayName === iconProperties.icon
    ) || TrophyIcon;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full flex-col gap-4"
      >
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
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-muted-foreground">
                    Grupo
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="max-w-96"
                      placeholder="Digite o nome do grupo"
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
            {loading ? "Aguarde..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
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
