"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  useCreateTransactionGroupMutation,
  useUpdateTransactionGroupMutation,
} from "@/graphql/hooks/graphqlHooks";

import { TransactionGroupFormSchema } from "@/app/finance/transaction/[[...id]]/components/group/TransactionGroupForm";
import TransactionsGroupQuery from "@/graphql/queries/transactions/TransactionsGroupQuery";
import TransactionGroupByIdQuery from "@/graphql/queries/transactions/TransactionGroupByIdQuery";
import useRevalidateAndRefresh from "@/app/finance/transaction/[[...id]]/components/hooks/useRevalidateAndRefresh";

interface UseActionProps {
  isCreating: boolean;
  _id?: string;
}

export default function useGroupActions({ isCreating, _id }: UseActionProps) {
  const { refresh } = useRouter();
  const revalidateAndRefresh = useRevalidateAndRefresh();
  const [createTransactionGroup, { loading: creatingLoading }] =
    useCreateTransactionGroupMutation({});

  const [updateTransactionGroup, { loading: updatedLoading }] =
    useUpdateTransactionGroupMutation({});

  async function onSubmit(values: TransactionGroupFormSchema) {
    if (isCreating) {
      await toast.promise(
        createTransactionGroup({
          variables: {
            input: {
              description: values.group,
              iconProperties: values.iconProperties,
            },
          },
          refetchQueries: [
            {
              query: TransactionsGroupQuery,
              variables: {
                search: null,
              },
            },
            {
              query: TransactionGroupByIdQuery,
              variables: {
                _id: undefined,
              },
            },
          ],
        }),
        {
          loading: "Criando grupo...",
          success: "Grupo criado com sucesso!",
          error: "Erro ao criar grupo.",
        }
      );
      revalidateAndRefresh("transactionGroup", 50);
    } else {
      toast.promise(
        updateTransactionGroup({
          variables: {
            id: _id,
            updateTransactionGroup: {
              description: values.group,
              iconProperties: values.iconProperties,
            },
          },
          refetchQueries: [
            {
              query: TransactionsGroupQuery,
              variables: {
                search: null,
              },
            },
            {
              query: TransactionGroupByIdQuery,
              variables: {
                _id: undefined,
              },
            },
          ],
        }),
        {
          loading: "Atualizando categoria...",
          success: "Grupo atualizado com sucesso!",
          error: "Erro ao atualizar o grupo.",
        }
      );
      refresh();
    }
  }

  return {
    loading: creatingLoading || updatedLoading,
    onSubmit,
  };
}
