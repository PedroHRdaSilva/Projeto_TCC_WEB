import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/graphql/hooks/graphqlHooks";

export default function useCategoryActions() {
  const [createCategory, { loading: loadingCreateCategory }] =
    useCreateCategoryMutation({});

  const [updateCategory, { loading: loadingUpdateCategory }] =
    useUpdateCategoryMutation({});

  const [deleteCategory, { loading: loadingdeleteCategory }] =
    useDeleteCategoryMutation({});

  return {
    isLoading:
      loadingCreateCategory || loadingUpdateCategory || loadingdeleteCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
