import {
  useCreateCreditCardMutation,
  useDeleteCreditCardMutation,
  useUpdateCreditCardMutation,
} from "@/graphql/hooks/graphqlHooks";

export default function useCreditActions() {
  const [createCredit, { loading: loadingCredit }] =
    useCreateCreditCardMutation();

  const [updateCredit, { loading: loadingUpdateCredit }] =
    useUpdateCreditCardMutation();

  const [deleteCredit, { loading: loadingDeleteCredit }] =
    useDeleteCreditCardMutation();

  return {
    isLoading: loadingCredit || loadingUpdateCredit || loadingDeleteCredit,
    createCredit,
    updateCredit,
    deleteCredit,
  };
}
