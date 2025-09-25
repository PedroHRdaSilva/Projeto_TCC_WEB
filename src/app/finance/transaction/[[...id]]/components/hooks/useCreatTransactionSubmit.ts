import { lightFormat } from "date-fns";
import { toast as toastSonner } from "sonner";

import type {
  ITransactionGroupByIdQuery,
  ITransactionsByGroupIdQuery,
  ITransactionsByGroupIdQueryVariables,
} from "@/graphql/types/graphqlTypes";

import { getViewerSession } from "@/lib/auth/actions";
import parseCurrencyToNumber from "@/utils/currency";

import type { InternalRefetchQueriesInclude } from "@apollo/client";
import useTransactionActions from "@/app/finance/transaction/[[...id]]/components/hooks/useTransactionActions";
import { CreateTransactionSchema } from "@/utils/transactionsSchema";
import TransactionsByGroupIdQuery from "@/graphql/queries/transactions/TransactionsByGroupIdQuery";

import { createGraphqlClient } from "@/lib/apollo/createGraphqlClient";

interface UseCreatTransactionSubmitProps {
  transactionGroup: NonNullable<
    ITransactionGroupByIdQuery["transactionGroupById"]
  >;
  initialValues?: NonNullable<
    ITransactionsByGroupIdQuery["transactions"]
  >["nodes"][0];
  refetchQueries: InternalRefetchQueriesInclude;
  onFinished?: (value: boolean) => void;
  setOpenAlert: (value: boolean) => void;
  skipValidation?: boolean;
}

export default function useCreatTransactionSubmit({
  transactionGroup,
  initialValues,
  refetchQueries,
  onFinished,
  setOpenAlert,
}: UseCreatTransactionSubmitProps) {
  const { createTransaction, updateTransaction } = useTransactionActions();

  async function onSubmit(
    values: CreateTransactionSchema,
    skipValidation = false,
    closeAfterSave = false
  ) {
    const commonData = {
      amount: parseCurrencyToNumber(values.value),
      categoryId: values.categories,
      date: lightFormat(values.date, "yyyy-MM-dd"),
      description: values.description,
      transactionGroupId: transactionGroup._id,
    };

    if (!skipValidation) {
      const session = await getViewerSession();
      const client = createGraphqlClient(session);

      const { data } = await client.query<
        ITransactionsByGroupIdQuery,
        ITransactionsByGroupIdQueryVariables
      >({
        query: TransactionsByGroupIdQuery,
        variables: {
          cursor: null,
          filterByCategoryId: undefined,
          filterByPeriod: lightFormat(values.date, "yyyy-MM-dd"),
          filterBySearch: values.description,
          groupId: transactionGroup._id,
          limit: 1,
        },
      });
      if (data && data.transactions && data.transactions.nodes.length > 0) {
        const descricaoIgual = data.transactions.nodes.find(
          (node) =>
            node.description.toLowerCase().trim() ===
            values.description.toLowerCase().trim()
        );

        if (descricaoIgual) {
          if (!initialValues) {
            setOpenAlert(true);
            return;
          }

          if (
            initialValues.description.toLowerCase().trim() !==
            values.description.toLowerCase().trim()
          ) {
            setOpenAlert(true);
            return;
          }
        }
      }
    }

    if (initialValues) {
      toastSonner.promise(
        updateTransaction({
          variables: {
            id: initialValues._id,
            input: {
              ...commonData,
              creditCardId: values.credit || undefined,
              installmentCount: values.installment ?? null,
              isRecurringPayment: values.recurring,
            },
          },
          refetchQueries,
        }),
        {
          position: "top-center",
          loading: "Atualizando transação...",
          success: "Transação atualizada com sucesso!",
          error: "Erro ao atualizar a Transação.",
        }
      );
    } else {
      toastSonner.promise(
        createTransaction({
          variables: {
            input: {
              ...commonData,
              creditCardId: values.credit || undefined,
              installmentCount: values.installment ?? null,
              isRecurringPayment: values.recurring,
            },
          },
          refetchQueries,
        }),
        {
          position: "top-center",
          loading: "Criando transação...",
          success: "Transação criada com sucesso!",
          error: "Erro ao criar a Transação.",
        }
      );
    }
    onFinished?.(closeAfterSave);
  }

  return { onSubmit };
}
