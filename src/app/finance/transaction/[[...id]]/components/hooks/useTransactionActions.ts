import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} from "@/graphql/hooks/graphqlHooks";

export default function useTransactionActions() {
  const [createTransaction] = useCreateTransactionMutation();
  const [updateTransaction, { loading: loadingUpdateTransaction }] =
    useUpdateTransactionMutation();

  const [deleteTransaction, { loading: loadingDeleteTransaction }] =
    useDeleteTransactionMutation();

  return {
    isLoading: loadingUpdateTransaction || loadingDeleteTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
