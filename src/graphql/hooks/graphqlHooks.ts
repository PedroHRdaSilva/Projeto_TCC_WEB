/* eslint-disable */
import * as Types from "../types/graphqlTypes";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;

export const CreateCategoryDocument = gql`
  mutation CreateCategory($input: CreateCategoryCustomInput!) {
    createCategory(input: $input) {
      _id
      description
      iconProperties {
        background
        color
        icon
      }
      type
    }
  }
`;
export type ICreateCategoryMutationFn = Apollo.MutationFunction<
  Types.ICreateCategoryMutation,
  Types.ICreateCategoryMutationVariables
>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ICreateCategoryMutation,
    Types.ICreateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ICreateCategoryMutation,
    Types.ICreateCategoryMutationVariables
  >(CreateCategoryDocument, options);
}
export type CreateCategoryMutationHookResult = ReturnType<
  typeof useCreateCategoryMutation
>;
export type CreateCategoryMutationResult =
  Apollo.MutationResult<Types.ICreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  Types.ICreateCategoryMutation,
  Types.ICreateCategoryMutationVariables
>;
export const CreateCreditCardDocument = gql`
  mutation CreateCreditCard($input: CreditCardInput!) {
    createCreditCard(input: $input) {
      _id
      transactionGroupId
      description
      limit
      validity
    }
  }
`;
export type ICreateCreditCardMutationFn = Apollo.MutationFunction<
  Types.ICreateCreditCardMutation,
  Types.ICreateCreditCardMutationVariables
>;

/**
 * __useCreateCreditCardMutation__
 *
 * To run a mutation, you first call `useCreateCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCreditCardMutation, { data, loading, error }] = useCreateCreditCardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCreditCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ICreateCreditCardMutation,
    Types.ICreateCreditCardMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ICreateCreditCardMutation,
    Types.ICreateCreditCardMutationVariables
  >(CreateCreditCardDocument, options);
}
export type CreateCreditCardMutationHookResult = ReturnType<
  typeof useCreateCreditCardMutation
>;
export type CreateCreditCardMutationResult =
  Apollo.MutationResult<Types.ICreateCreditCardMutation>;
export type CreateCreditCardMutationOptions = Apollo.BaseMutationOptions<
  Types.ICreateCreditCardMutation,
  Types.ICreateCreditCardMutationVariables
>;
export const CreateTransactionGroupDocument = gql`
  mutation CreateTransactionGroup($input: CreateTransactionGroupInput!) {
    createTransactionGroup(input: $input) {
      _id
      owner {
        name
      }
      iconProperties {
        background
        color
        icon
      }
      description
    }
  }
`;
export type ICreateTransactionGroupMutationFn = Apollo.MutationFunction<
  Types.ICreateTransactionGroupMutation,
  Types.ICreateTransactionGroupMutationVariables
>;

/**
 * __useCreateTransactionGroupMutation__
 *
 * To run a mutation, you first call `useCreateTransactionGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionGroupMutation, { data, loading, error }] = useCreateTransactionGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTransactionGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ICreateTransactionGroupMutation,
    Types.ICreateTransactionGroupMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ICreateTransactionGroupMutation,
    Types.ICreateTransactionGroupMutationVariables
  >(CreateTransactionGroupDocument, options);
}
export type CreateTransactionGroupMutationHookResult = ReturnType<
  typeof useCreateTransactionGroupMutation
>;
export type CreateTransactionGroupMutationResult =
  Apollo.MutationResult<Types.ICreateTransactionGroupMutation>;
export type CreateTransactionGroupMutationOptions = Apollo.BaseMutationOptions<
  Types.ICreateTransactionGroupMutation,
  Types.ICreateTransactionGroupMutationVariables
>;
export const CreateTransactionDocument = gql`
  mutation CreateTransaction($input: TransactionInput!) {
    createTransaction(input: $input) {
      _id
      transactionGroupId
      category {
        _id
        description
        iconProperties {
          background
          color
          icon
        }
        type
        isDefault
      }
      date
      description
      amount
      installments {
        total
        current
      }
      creditCard {
        _id
        transactionGroupId
        description
      }
    }
  }
`;
export type ICreateTransactionMutationFn = Apollo.MutationFunction<
  Types.ICreateTransactionMutation,
  Types.ICreateTransactionMutationVariables
>;

/**
 * __useCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionMutation, { data, loading, error }] = useCreateTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTransactionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ICreateTransactionMutation,
    Types.ICreateTransactionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ICreateTransactionMutation,
    Types.ICreateTransactionMutationVariables
  >(CreateTransactionDocument, options);
}
export type CreateTransactionMutationHookResult = ReturnType<
  typeof useCreateTransactionMutation
>;
export type CreateTransactionMutationResult =
  Apollo.MutationResult<Types.ICreateTransactionMutation>;
export type CreateTransactionMutationOptions = Apollo.BaseMutationOptions<
  Types.ICreateTransactionMutation,
  Types.ICreateTransactionMutationVariables
>;
export const DeleteCategoryDocument = gql`
  mutation DeleteCategory($id: ObjectID!, $groupId: ObjectID!) {
    deleteCategory(_id: $id, groupId: $groupId)
  }
`;
export type IDeleteCategoryMutationFn = Apollo.MutationFunction<
  Types.IDeleteCategoryMutation,
  Types.IDeleteCategoryMutationVariables
>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useDeleteCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.IDeleteCategoryMutation,
    Types.IDeleteCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.IDeleteCategoryMutation,
    Types.IDeleteCategoryMutationVariables
  >(DeleteCategoryDocument, options);
}
export type DeleteCategoryMutationHookResult = ReturnType<
  typeof useDeleteCategoryMutation
>;
export type DeleteCategoryMutationResult =
  Apollo.MutationResult<Types.IDeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<
  Types.IDeleteCategoryMutation,
  Types.IDeleteCategoryMutationVariables
>;
export const DeleteCreditCardDocument = gql`
  mutation DeleteCreditCard($id: ObjectID!) {
    deleteCreditCard(_id: $id)
  }
`;
export type IDeleteCreditCardMutationFn = Apollo.MutationFunction<
  Types.IDeleteCreditCardMutation,
  Types.IDeleteCreditCardMutationVariables
>;

/**
 * __useDeleteCreditCardMutation__
 *
 * To run a mutation, you first call `useDeleteCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCreditCardMutation, { data, loading, error }] = useDeleteCreditCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCreditCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.IDeleteCreditCardMutation,
    Types.IDeleteCreditCardMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.IDeleteCreditCardMutation,
    Types.IDeleteCreditCardMutationVariables
  >(DeleteCreditCardDocument, options);
}
export type DeleteCreditCardMutationHookResult = ReturnType<
  typeof useDeleteCreditCardMutation
>;
export type DeleteCreditCardMutationResult =
  Apollo.MutationResult<Types.IDeleteCreditCardMutation>;
export type DeleteCreditCardMutationOptions = Apollo.BaseMutationOptions<
  Types.IDeleteCreditCardMutation,
  Types.IDeleteCreditCardMutationVariables
>;
export const DeleteTransactionGroupDocument = gql`
  mutation DeleteTransactionGroup($_id: ObjectID!) {
    deleteTransactionGroup(_id: $_id)
  }
`;
export type IDeleteTransactionGroupMutationFn = Apollo.MutationFunction<
  Types.IDeleteTransactionGroupMutation,
  Types.IDeleteTransactionGroupMutationVariables
>;

/**
 * __useDeleteTransactionGroupMutation__
 *
 * To run a mutation, you first call `useDeleteTransactionGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransactionGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransactionGroupMutation, { data, loading, error }] = useDeleteTransactionGroupMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteTransactionGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.IDeleteTransactionGroupMutation,
    Types.IDeleteTransactionGroupMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.IDeleteTransactionGroupMutation,
    Types.IDeleteTransactionGroupMutationVariables
  >(DeleteTransactionGroupDocument, options);
}
export type DeleteTransactionGroupMutationHookResult = ReturnType<
  typeof useDeleteTransactionGroupMutation
>;
export type DeleteTransactionGroupMutationResult =
  Apollo.MutationResult<Types.IDeleteTransactionGroupMutation>;
export type DeleteTransactionGroupMutationOptions = Apollo.BaseMutationOptions<
  Types.IDeleteTransactionGroupMutation,
  Types.IDeleteTransactionGroupMutationVariables
>;
export const DeleteTransactionDocument = gql`
  mutation DeleteTransaction($_id: [ObjectID!]!) {
    deleteTransaction(_id: $_id)
  }
`;
export type IDeleteTransactionMutationFn = Apollo.MutationFunction<
  Types.IDeleteTransactionMutation,
  Types.IDeleteTransactionMutationVariables
>;

/**
 * __useDeleteTransactionMutation__
 *
 * To run a mutation, you first call `useDeleteTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransactionMutation, { data, loading, error }] = useDeleteTransactionMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteTransactionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.IDeleteTransactionMutation,
    Types.IDeleteTransactionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.IDeleteTransactionMutation,
    Types.IDeleteTransactionMutationVariables
  >(DeleteTransactionDocument, options);
}
export type DeleteTransactionMutationHookResult = ReturnType<
  typeof useDeleteTransactionMutation
>;
export type DeleteTransactionMutationResult =
  Apollo.MutationResult<Types.IDeleteTransactionMutation>;
export type DeleteTransactionMutationOptions = Apollo.BaseMutationOptions<
  Types.IDeleteTransactionMutation,
  Types.IDeleteTransactionMutationVariables
>;
export const TransactionStatusDocument = gql`
  mutation TransactionStatus($id: [ObjectID!]!, $status: TransactionStatus!) {
    transactionStatus(_id: $id, status: $status)
  }
`;
export type ITransactionStatusMutationFn = Apollo.MutationFunction<
  Types.ITransactionStatusMutation,
  Types.ITransactionStatusMutationVariables
>;

/**
 * __useTransactionStatusMutation__
 *
 * To run a mutation, you first call `useTransactionStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransactionStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transactionStatusMutation, { data, loading, error }] = useTransactionStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useTransactionStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ITransactionStatusMutation,
    Types.ITransactionStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ITransactionStatusMutation,
    Types.ITransactionStatusMutationVariables
  >(TransactionStatusDocument, options);
}
export type TransactionStatusMutationHookResult = ReturnType<
  typeof useTransactionStatusMutation
>;
export type TransactionStatusMutationResult =
  Apollo.MutationResult<Types.ITransactionStatusMutation>;
export type TransactionStatusMutationOptions = Apollo.BaseMutationOptions<
  Types.ITransactionStatusMutation,
  Types.ITransactionStatusMutationVariables
>;
export const UpdateCategoryDocument = gql`
  mutation UpdateCategory($id: ObjectID!, $input: UpdateCustomInput!) {
    updateCategory(_id: $id, input: $input) {
      _id
      description
      iconProperties {
        background
        color
        icon
      }
      type
    }
  }
`;
export type IUpdateCategoryMutationFn = Apollo.MutationFunction<
  Types.IUpdateCategoryMutation,
  Types.IUpdateCategoryMutationVariables
>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.IUpdateCategoryMutation,
    Types.IUpdateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.IUpdateCategoryMutation,
    Types.IUpdateCategoryMutationVariables
  >(UpdateCategoryDocument, options);
}
export type UpdateCategoryMutationHookResult = ReturnType<
  typeof useUpdateCategoryMutation
>;
export type UpdateCategoryMutationResult =
  Apollo.MutationResult<Types.IUpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<
  Types.IUpdateCategoryMutation,
  Types.IUpdateCategoryMutationVariables
>;
export const UpdateCreditCardDocument = gql`
  mutation UpdateCreditCard($id: ObjectID!, $input: CreditCardInput!) {
    updateCreditCard(_id: $id, input: $input) {
      _id
      transactionGroupId
      description
      limit
      validity
    }
  }
`;
export type IUpdateCreditCardMutationFn = Apollo.MutationFunction<
  Types.IUpdateCreditCardMutation,
  Types.IUpdateCreditCardMutationVariables
>;

/**
 * __useUpdateCreditCardMutation__
 *
 * To run a mutation, you first call `useUpdateCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCreditCardMutation, { data, loading, error }] = useUpdateCreditCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCreditCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.IUpdateCreditCardMutation,
    Types.IUpdateCreditCardMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.IUpdateCreditCardMutation,
    Types.IUpdateCreditCardMutationVariables
  >(UpdateCreditCardDocument, options);
}
export type UpdateCreditCardMutationHookResult = ReturnType<
  typeof useUpdateCreditCardMutation
>;
export type UpdateCreditCardMutationResult =
  Apollo.MutationResult<Types.IUpdateCreditCardMutation>;
export type UpdateCreditCardMutationOptions = Apollo.BaseMutationOptions<
  Types.IUpdateCreditCardMutation,
  Types.IUpdateCreditCardMutationVariables
>;
export const UpdateTransactionGroupDocument = gql`
  mutation UpdateTransactionGroup(
    $id: ObjectID!
    $updateTransactionGroup: UpdateTransactionGroupInput!
  ) {
    updateTransactionGroup(_id: $id, input: $updateTransactionGroup) {
      _id
      owner {
        name
      }
      iconProperties {
        background
        color
        icon
      }
      description
    }
  }
`;
export type IUpdateTransactionGroupMutationFn = Apollo.MutationFunction<
  Types.IUpdateTransactionGroupMutation,
  Types.IUpdateTransactionGroupMutationVariables
>;

/**
 * __useUpdateTransactionGroupMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionGroupMutation, { data, loading, error }] = useUpdateTransactionGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateTransactionGroup: // value for 'updateTransactionGroup'
 *   },
 * });
 */
export function useUpdateTransactionGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.IUpdateTransactionGroupMutation,
    Types.IUpdateTransactionGroupMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.IUpdateTransactionGroupMutation,
    Types.IUpdateTransactionGroupMutationVariables
  >(UpdateTransactionGroupDocument, options);
}
export type UpdateTransactionGroupMutationHookResult = ReturnType<
  typeof useUpdateTransactionGroupMutation
>;
export type UpdateTransactionGroupMutationResult =
  Apollo.MutationResult<Types.IUpdateTransactionGroupMutation>;
export type UpdateTransactionGroupMutationOptions = Apollo.BaseMutationOptions<
  Types.IUpdateTransactionGroupMutation,
  Types.IUpdateTransactionGroupMutationVariables
>;
export const UpdateTransactionDocument = gql`
  mutation UpdateTransaction($id: ObjectID!, $input: TransactionInput!) {
    updateTransaction(_id: $id, input: $input) {
      _id
      transactionGroupId
      category {
        description
        _id
        iconProperties {
          background
          color
          icon
        }
        type
        isDefault
      }
      date
      description
      amount
      installments {
        total
        current
      }
      creditCard {
        _id
        transactionGroupId
        description
      }
    }
  }
`;
export type IUpdateTransactionMutationFn = Apollo.MutationFunction<
  Types.IUpdateTransactionMutation,
  Types.IUpdateTransactionMutationVariables
>;

/**
 * __useUpdateTransactionMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionMutation, { data, loading, error }] = useUpdateTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTransactionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.IUpdateTransactionMutation,
    Types.IUpdateTransactionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.IUpdateTransactionMutation,
    Types.IUpdateTransactionMutationVariables
  >(UpdateTransactionDocument, options);
}
export type UpdateTransactionMutationHookResult = ReturnType<
  typeof useUpdateTransactionMutation
>;
export type UpdateTransactionMutationResult =
  Apollo.MutationResult<Types.IUpdateTransactionMutation>;
export type UpdateTransactionMutationOptions = Apollo.BaseMutationOptions<
  Types.IUpdateTransactionMutation,
  Types.IUpdateTransactionMutationVariables
>;
export const CreateUserDocument = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(input: $createUserInput)
  }
`;
export type ICreateUserMutationFn = Apollo.MutationFunction<
  Types.ICreateUserMutation,
  Types.ICreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ICreateUserMutation,
    Types.ICreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ICreateUserMutation,
    Types.ICreateUserMutationVariables
  >(CreateUserDocument, options);
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<Types.ICreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  Types.ICreateUserMutation,
  Types.ICreateUserMutationVariables
>;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export type IForgotPasswordMutationFn = Apollo.MutationFunction<
  Types.IForgotPasswordMutation,
  Types.IForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.IForgotPasswordMutation,
    Types.IForgotPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.IForgotPasswordMutation,
    Types.IForgotPasswordMutationVariables
  >(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult =
  Apollo.MutationResult<Types.IForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  Types.IForgotPasswordMutation,
  Types.IForgotPasswordMutationVariables
>;
export const LoginWithCredentialsDocument = gql`
  mutation LoginWithCredentials($email: String!, $password: String!) {
    loginWithCredentials(email: $email, password: $password) {
      accessToken
      email
    }
  }
`;
export type ILoginWithCredentialsMutationFn = Apollo.MutationFunction<
  Types.ILoginWithCredentialsMutation,
  Types.ILoginWithCredentialsMutationVariables
>;

/**
 * __useLoginWithCredentialsMutation__
 *
 * To run a mutation, you first call `useLoginWithCredentialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithCredentialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithCredentialsMutation, { data, loading, error }] = useLoginWithCredentialsMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginWithCredentialsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ILoginWithCredentialsMutation,
    Types.ILoginWithCredentialsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ILoginWithCredentialsMutation,
    Types.ILoginWithCredentialsMutationVariables
  >(LoginWithCredentialsDocument, options);
}
export type LoginWithCredentialsMutationHookResult = ReturnType<
  typeof useLoginWithCredentialsMutation
>;
export type LoginWithCredentialsMutationResult =
  Apollo.MutationResult<Types.ILoginWithCredentialsMutation>;
export type LoginWithCredentialsMutationOptions = Apollo.BaseMutationOptions<
  Types.ILoginWithCredentialsMutation,
  Types.ILoginWithCredentialsMutationVariables
>;
export const ResetPasswordDocument = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`;
export type IResetPasswordMutationFn = Apollo.MutationFunction<
  Types.IResetPasswordMutation,
  Types.IResetPasswordMutationVariables
>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.IResetPasswordMutation,
    Types.IResetPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.IResetPasswordMutation,
    Types.IResetPasswordMutationVariables
  >(ResetPasswordDocument, options);
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>;
export type ResetPasswordMutationResult =
  Apollo.MutationResult<Types.IResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  Types.IResetPasswordMutation,
  Types.IResetPasswordMutationVariables
>;
export const UpdateUserNameMutationDocument = gql`
  mutation UpdateUserNameMutation($name: String!) {
    updateUserName(name: $name)
  }
`;
export type IUpdateUserNameMutationMutationFn = Apollo.MutationFunction<
  Types.IUpdateUserNameMutation,
  Types.IUpdateUserNameMutationVariables
>;

/**
 * __useUpdateUserNameMutation__
 *
 * To run a mutation, you first call `useUpdateUserNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserNameMutation, { data, loading, error }] = useUpdateUserNameMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateUserNameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.IUpdateUserNameMutation,
    Types.IUpdateUserNameMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.IUpdateUserNameMutation,
    Types.IUpdateUserNameMutationVariables
  >(UpdateUserNameMutationDocument, options);
}
export type UpdateUserNameMutationHookResult = ReturnType<
  typeof useUpdateUserNameMutation
>;
export type UpdateUserNameMutationMutationResult =
  Apollo.MutationResult<Types.IUpdateUserNameMutation>;
export type UpdateUserNameMutationMutationOptions = Apollo.BaseMutationOptions<
  Types.IUpdateUserNameMutation,
  Types.IUpdateUserNameMutationVariables
>;
export const UpdateUserPasswordMutationDocument = gql`
  mutation UpdateUserPasswordMutation($password: String!) {
    updateUserPassword(password: $password)
  }
`;
export type IUpdateUserPasswordMutationMutationFn = Apollo.MutationFunction<
  Types.IUpdateUserPasswordMutation,
  Types.IUpdateUserPasswordMutationVariables
>;

/**
 * __useUpdateUserPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPasswordMutation, { data, loading, error }] = useUpdateUserPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdateUserPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.IUpdateUserPasswordMutation,
    Types.IUpdateUserPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.IUpdateUserPasswordMutation,
    Types.IUpdateUserPasswordMutationVariables
  >(UpdateUserPasswordMutationDocument, options);
}
export type UpdateUserPasswordMutationHookResult = ReturnType<
  typeof useUpdateUserPasswordMutation
>;
export type UpdateUserPasswordMutationMutationResult =
  Apollo.MutationResult<Types.IUpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationMutationOptions =
  Apollo.BaseMutationOptions<
    Types.IUpdateUserPasswordMutation,
    Types.IUpdateUserPasswordMutationVariables
  >;
export const CardCategorySpendingDocument = gql`
  query CardCategorySpending(
    $groupId: ObjectID!
    $filterByStartMonth: Date
    $filterByEndMonth: Date
  ) {
    cardCategorySpending(
      groupId: $groupId
      filterByStartMonth: $filterByStartMonth
      filterByEndMonth: $filterByEndMonth
    ) {
      reportDate
      amount
      category {
        _id
        description
        type
        isDefault
      }
      transactions {
        _id
        transactionGroupId
        category {
          _id
          description
          type
          isDefault
        }
        date
        description
        amount
      }
      creditCard {
        _id
        description
      }
    }
  }
`;

/**
 * __useCardCategorySpendingQuery__
 *
 * To run a query within a React component, call `useCardCategorySpendingQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardCategorySpendingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardCategorySpendingQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      filterByStartMonth: // value for 'filterByStartMonth'
 *      filterByEndMonth: // value for 'filterByEndMonth'
 *   },
 * });
 */
export function useCardCategorySpendingQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.ICardCategorySpendingQuery,
    Types.ICardCategorySpendingQueryVariables
  > &
    (
      | { variables: Types.ICardCategorySpendingQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ICardCategorySpendingQuery,
    Types.ICardCategorySpendingQueryVariables
  >(CardCategorySpendingDocument, options);
}
export function useCardCategorySpendingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ICardCategorySpendingQuery,
    Types.ICardCategorySpendingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ICardCategorySpendingQuery,
    Types.ICardCategorySpendingQueryVariables
  >(CardCategorySpendingDocument, options);
}
export function useCardCategorySpendingSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.ICardCategorySpendingQuery,
        Types.ICardCategorySpendingQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.ICardCategorySpendingQuery,
    Types.ICardCategorySpendingQueryVariables
  >(CardCategorySpendingDocument, options);
}
export type CardCategorySpendingQueryHookResult = ReturnType<
  typeof useCardCategorySpendingQuery
>;
export type CardCategorySpendingLazyQueryHookResult = ReturnType<
  typeof useCardCategorySpendingLazyQuery
>;
export type CardCategorySpendingSuspenseQueryHookResult = ReturnType<
  typeof useCardCategorySpendingSuspenseQuery
>;
export type CardCategorySpendingQueryResult = Apollo.QueryResult<
  Types.ICardCategorySpendingQuery,
  Types.ICardCategorySpendingQueryVariables
>;
export const CategoriesByGroupIdDocument = gql`
  query CategoriesByGroupId($transactionGroupId: ObjectID!) {
    categoriesByGroupId(transactionGroupId: $transactionGroupId) {
      _id
      description
      iconProperties {
        background
        color
        icon
      }
      type
      isDefault
    }
  }
`;

/**
 * __useCategoriesByGroupIdQuery__
 *
 * To run a query within a React component, call `useCategoriesByGroupIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesByGroupIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesByGroupIdQuery({
 *   variables: {
 *      transactionGroupId: // value for 'transactionGroupId'
 *   },
 * });
 */
export function useCategoriesByGroupIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.ICategoriesByGroupIdQuery,
    Types.ICategoriesByGroupIdQueryVariables
  > &
    (
      | { variables: Types.ICategoriesByGroupIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ICategoriesByGroupIdQuery,
    Types.ICategoriesByGroupIdQueryVariables
  >(CategoriesByGroupIdDocument, options);
}
export function useCategoriesByGroupIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ICategoriesByGroupIdQuery,
    Types.ICategoriesByGroupIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ICategoriesByGroupIdQuery,
    Types.ICategoriesByGroupIdQueryVariables
  >(CategoriesByGroupIdDocument, options);
}
export function useCategoriesByGroupIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.ICategoriesByGroupIdQuery,
        Types.ICategoriesByGroupIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.ICategoriesByGroupIdQuery,
    Types.ICategoriesByGroupIdQueryVariables
  >(CategoriesByGroupIdDocument, options);
}
export type CategoriesByGroupIdQueryHookResult = ReturnType<
  typeof useCategoriesByGroupIdQuery
>;
export type CategoriesByGroupIdLazyQueryHookResult = ReturnType<
  typeof useCategoriesByGroupIdLazyQuery
>;
export type CategoriesByGroupIdSuspenseQueryHookResult = ReturnType<
  typeof useCategoriesByGroupIdSuspenseQuery
>;
export type CategoriesByGroupIdQueryResult = Apollo.QueryResult<
  Types.ICategoriesByGroupIdQuery,
  Types.ICategoriesByGroupIdQueryVariables
>;
export const CategoriesByIdDocument = gql`
  query CategoriesById($categoryId: ObjectID!) {
    categoryById(categoryId: $categoryId) {
      _id
      description
      iconProperties {
        background
        color
        icon
      }
      type
      isDefault
    }
  }
`;

/**
 * __useCategoriesByIdQuery__
 *
 * To run a query within a React component, call `useCategoriesByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesByIdQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useCategoriesByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.ICategoriesByIdQuery,
    Types.ICategoriesByIdQueryVariables
  > &
    (
      | { variables: Types.ICategoriesByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ICategoriesByIdQuery,
    Types.ICategoriesByIdQueryVariables
  >(CategoriesByIdDocument, options);
}
export function useCategoriesByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ICategoriesByIdQuery,
    Types.ICategoriesByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ICategoriesByIdQuery,
    Types.ICategoriesByIdQueryVariables
  >(CategoriesByIdDocument, options);
}
export function useCategoriesByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.ICategoriesByIdQuery,
        Types.ICategoriesByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.ICategoriesByIdQuery,
    Types.ICategoriesByIdQueryVariables
  >(CategoriesByIdDocument, options);
}
export type CategoriesByIdQueryHookResult = ReturnType<
  typeof useCategoriesByIdQuery
>;
export type CategoriesByIdLazyQueryHookResult = ReturnType<
  typeof useCategoriesByIdLazyQuery
>;
export type CategoriesByIdSuspenseQueryHookResult = ReturnType<
  typeof useCategoriesByIdSuspenseQuery
>;
export type CategoriesByIdQueryResult = Apollo.QueryResult<
  Types.ICategoriesByIdQuery,
  Types.ICategoriesByIdQueryVariables
>;
export const CreditCardByGroupIdDocument = gql`
  query CreditCardByGroupId($transactionGroupId: ObjectID!) {
    creditCardByGroupId(transactionGroupId: $transactionGroupId) {
      _id
      transactionGroupId
      description
      limit
      validity
    }
  }
`;

/**
 * __useCreditCardByGroupIdQuery__
 *
 * To run a query within a React component, call `useCreditCardByGroupIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreditCardByGroupIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreditCardByGroupIdQuery({
 *   variables: {
 *      transactionGroupId: // value for 'transactionGroupId'
 *   },
 * });
 */
export function useCreditCardByGroupIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.ICreditCardByGroupIdQuery,
    Types.ICreditCardByGroupIdQueryVariables
  > &
    (
      | { variables: Types.ICreditCardByGroupIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ICreditCardByGroupIdQuery,
    Types.ICreditCardByGroupIdQueryVariables
  >(CreditCardByGroupIdDocument, options);
}
export function useCreditCardByGroupIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ICreditCardByGroupIdQuery,
    Types.ICreditCardByGroupIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ICreditCardByGroupIdQuery,
    Types.ICreditCardByGroupIdQueryVariables
  >(CreditCardByGroupIdDocument, options);
}
export function useCreditCardByGroupIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.ICreditCardByGroupIdQuery,
        Types.ICreditCardByGroupIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.ICreditCardByGroupIdQuery,
    Types.ICreditCardByGroupIdQueryVariables
  >(CreditCardByGroupIdDocument, options);
}
export type CreditCardByGroupIdQueryHookResult = ReturnType<
  typeof useCreditCardByGroupIdQuery
>;
export type CreditCardByGroupIdLazyQueryHookResult = ReturnType<
  typeof useCreditCardByGroupIdLazyQuery
>;
export type CreditCardByGroupIdSuspenseQueryHookResult = ReturnType<
  typeof useCreditCardByGroupIdSuspenseQuery
>;
export type CreditCardByGroupIdQueryResult = Apollo.QueryResult<
  Types.ICreditCardByGroupIdQuery,
  Types.ICreditCardByGroupIdQueryVariables
>;
export const MonthlyRevenueVsExpensesDocument = gql`
  query MonthlyRevenueVsExpenses(
    $groupId: ObjectID!
    $filterByStartMonth: Date
    $filterByEndMonth: Date
  ) {
    monthlyRevenueVsExpenses(
      groupId: $groupId
      filterByStartMonth: $filterByStartMonth
      filterByEndMonth: $filterByEndMonth
    ) {
      transactions {
        description
        category {
          type
          _id
          description
        }
        amount
        _id
      }
      revenue
      expense
      reportDate
    }
  }
`;

/**
 * __useMonthlyRevenueVsExpensesQuery__
 *
 * To run a query within a React component, call `useMonthlyRevenueVsExpensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMonthlyRevenueVsExpensesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonthlyRevenueVsExpensesQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      filterByStartMonth: // value for 'filterByStartMonth'
 *      filterByEndMonth: // value for 'filterByEndMonth'
 *   },
 * });
 */
export function useMonthlyRevenueVsExpensesQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.IMonthlyRevenueVsExpensesQuery,
    Types.IMonthlyRevenueVsExpensesQueryVariables
  > &
    (
      | {
          variables: Types.IMonthlyRevenueVsExpensesQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.IMonthlyRevenueVsExpensesQuery,
    Types.IMonthlyRevenueVsExpensesQueryVariables
  >(MonthlyRevenueVsExpensesDocument, options);
}
export function useMonthlyRevenueVsExpensesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.IMonthlyRevenueVsExpensesQuery,
    Types.IMonthlyRevenueVsExpensesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.IMonthlyRevenueVsExpensesQuery,
    Types.IMonthlyRevenueVsExpensesQueryVariables
  >(MonthlyRevenueVsExpensesDocument, options);
}
export function useMonthlyRevenueVsExpensesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.IMonthlyRevenueVsExpensesQuery,
        Types.IMonthlyRevenueVsExpensesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.IMonthlyRevenueVsExpensesQuery,
    Types.IMonthlyRevenueVsExpensesQueryVariables
  >(MonthlyRevenueVsExpensesDocument, options);
}
export type MonthlyRevenueVsExpensesQueryHookResult = ReturnType<
  typeof useMonthlyRevenueVsExpensesQuery
>;
export type MonthlyRevenueVsExpensesLazyQueryHookResult = ReturnType<
  typeof useMonthlyRevenueVsExpensesLazyQuery
>;
export type MonthlyRevenueVsExpensesSuspenseQueryHookResult = ReturnType<
  typeof useMonthlyRevenueVsExpensesSuspenseQuery
>;
export type MonthlyRevenueVsExpensesQueryResult = Apollo.QueryResult<
  Types.IMonthlyRevenueVsExpensesQuery,
  Types.IMonthlyRevenueVsExpensesQueryVariables
>;
export const MonthlySpendingByCategoryDocument = gql`
  query MonthlySpendingByCategory(
    $groupId: ObjectID!
    $filterByStartMonth: Date
    $filterByEndMonth: Date
  ) {
    monthlySpendingByCategory(
      groupId: $groupId
      filterByStartMonth: $filterByStartMonth
      filterByEndMonth: $filterByEndMonth
    ) {
      transactions {
        transactionGroupId
        description
        amount
        _id
      }
      amount
      reportDate
      category {
        _id
        description
      }
    }
  }
`;

/**
 * __useMonthlySpendingByCategoryQuery__
 *
 * To run a query within a React component, call `useMonthlySpendingByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMonthlySpendingByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonthlySpendingByCategoryQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      filterByStartMonth: // value for 'filterByStartMonth'
 *      filterByEndMonth: // value for 'filterByEndMonth'
 *   },
 * });
 */
export function useMonthlySpendingByCategoryQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.IMonthlySpendingByCategoryQuery,
    Types.IMonthlySpendingByCategoryQueryVariables
  > &
    (
      | {
          variables: Types.IMonthlySpendingByCategoryQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.IMonthlySpendingByCategoryQuery,
    Types.IMonthlySpendingByCategoryQueryVariables
  >(MonthlySpendingByCategoryDocument, options);
}
export function useMonthlySpendingByCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.IMonthlySpendingByCategoryQuery,
    Types.IMonthlySpendingByCategoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.IMonthlySpendingByCategoryQuery,
    Types.IMonthlySpendingByCategoryQueryVariables
  >(MonthlySpendingByCategoryDocument, options);
}
export function useMonthlySpendingByCategorySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.IMonthlySpendingByCategoryQuery,
        Types.IMonthlySpendingByCategoryQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.IMonthlySpendingByCategoryQuery,
    Types.IMonthlySpendingByCategoryQueryVariables
  >(MonthlySpendingByCategoryDocument, options);
}
export type MonthlySpendingByCategoryQueryHookResult = ReturnType<
  typeof useMonthlySpendingByCategoryQuery
>;
export type MonthlySpendingByCategoryLazyQueryHookResult = ReturnType<
  typeof useMonthlySpendingByCategoryLazyQuery
>;
export type MonthlySpendingByCategorySuspenseQueryHookResult = ReturnType<
  typeof useMonthlySpendingByCategorySuspenseQuery
>;
export type MonthlySpendingByCategoryQueryResult = Apollo.QueryResult<
  Types.IMonthlySpendingByCategoryQuery,
  Types.IMonthlySpendingByCategoryQueryVariables
>;
export const TransactionGroupByIdDocument = gql`
  query TransactionGroupById($_id: ObjectID) {
    transactionGroupById(_id: $_id) {
      _id
      owner {
        name
        _id
      }
      iconProperties {
        background
        color
        icon
      }
      description
    }
  }
`;

/**
 * __useTransactionGroupByIdQuery__
 *
 * To run a query within a React component, call `useTransactionGroupByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionGroupByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionGroupByIdQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useTransactionGroupByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.ITransactionGroupByIdQuery,
    Types.ITransactionGroupByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ITransactionGroupByIdQuery,
    Types.ITransactionGroupByIdQueryVariables
  >(TransactionGroupByIdDocument, options);
}
export function useTransactionGroupByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ITransactionGroupByIdQuery,
    Types.ITransactionGroupByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ITransactionGroupByIdQuery,
    Types.ITransactionGroupByIdQueryVariables
  >(TransactionGroupByIdDocument, options);
}
export function useTransactionGroupByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.ITransactionGroupByIdQuery,
        Types.ITransactionGroupByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.ITransactionGroupByIdQuery,
    Types.ITransactionGroupByIdQueryVariables
  >(TransactionGroupByIdDocument, options);
}
export type TransactionGroupByIdQueryHookResult = ReturnType<
  typeof useTransactionGroupByIdQuery
>;
export type TransactionGroupByIdLazyQueryHookResult = ReturnType<
  typeof useTransactionGroupByIdLazyQuery
>;
export type TransactionGroupByIdSuspenseQueryHookResult = ReturnType<
  typeof useTransactionGroupByIdSuspenseQuery
>;
export type TransactionGroupByIdQueryResult = Apollo.QueryResult<
  Types.ITransactionGroupByIdQuery,
  Types.ITransactionGroupByIdQueryVariables
>;
export const TransactionTotalsDocument = gql`
  query TransactionTotals(
    $groupId: ObjectID!
    $filterByPeriod: Date!
    $filterByCategoryId: ObjectID
    $filterBySearch: String
  ) {
    transactionTotals(
      groupId: $groupId
      filterByPeriod: $filterByPeriod
      filterByCategoryId: $filterByCategoryId
      filterBySearch: $filterBySearch
    ) {
      revenue {
        percentageVariation
        total
      }
      expense {
        percentageVariation
        total
      }
      balance {
        percentageVariation
        total
      }
    }
  }
`;

/**
 * __useTransactionTotalsQuery__
 *
 * To run a query within a React component, call `useTransactionTotalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionTotalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionTotalsQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      filterByPeriod: // value for 'filterByPeriod'
 *      filterByCategoryId: // value for 'filterByCategoryId'
 *      filterBySearch: // value for 'filterBySearch'
 *   },
 * });
 */
export function useTransactionTotalsQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.ITransactionTotalsQuery,
    Types.ITransactionTotalsQueryVariables
  > &
    (
      | { variables: Types.ITransactionTotalsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ITransactionTotalsQuery,
    Types.ITransactionTotalsQueryVariables
  >(TransactionTotalsDocument, options);
}
export function useTransactionTotalsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ITransactionTotalsQuery,
    Types.ITransactionTotalsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ITransactionTotalsQuery,
    Types.ITransactionTotalsQueryVariables
  >(TransactionTotalsDocument, options);
}
export function useTransactionTotalsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.ITransactionTotalsQuery,
        Types.ITransactionTotalsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.ITransactionTotalsQuery,
    Types.ITransactionTotalsQueryVariables
  >(TransactionTotalsDocument, options);
}
export type TransactionTotalsQueryHookResult = ReturnType<
  typeof useTransactionTotalsQuery
>;
export type TransactionTotalsLazyQueryHookResult = ReturnType<
  typeof useTransactionTotalsLazyQuery
>;
export type TransactionTotalsSuspenseQueryHookResult = ReturnType<
  typeof useTransactionTotalsSuspenseQuery
>;
export type TransactionTotalsQueryResult = Apollo.QueryResult<
  Types.ITransactionTotalsQuery,
  Types.ITransactionTotalsQueryVariables
>;
export const TransactionsByGroupIdDocument = gql`
  query TransactionsByGroupId(
    $groupId: ObjectID!
    $filterByPeriod: Date!
    $filterByCategoryId: ObjectID
    $filterBySearch: String
    $cursor: Cursor
    $limit: Int
  ) {
    transactions(
      groupId: $groupId
      filterByPeriod: $filterByPeriod
      filterByCategoryId: $filterByCategoryId
      filterBySearch: $filterBySearch
      cursor: $cursor
      limit: $limit
    )
      @connection(
        key: "transactions"
        filter: [
          "groupId"
          "filterByPeriod"
          "filterByCategoryId"
          "filterBySearch"
        ]
      ) {
      nodes {
        _id
        transactionGroupId
        category {
          _id
          description
          iconProperties {
            background
            color
            icon
          }
          type
          isDefault
        }
        status
        date
        description
        amount
        installments {
          total
          current
        }
        isRecurringPayment
        creditCard {
          _id
          transactionGroupId
          description
        }
      }
      pageInfo {
        cursor
        hasNextPage
        totalCount
      }
      totalCount
    }
  }
`;

/**
 * __useTransactionsByGroupIdQuery__
 *
 * To run a query within a React component, call `useTransactionsByGroupIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsByGroupIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsByGroupIdQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      filterByPeriod: // value for 'filterByPeriod'
 *      filterByCategoryId: // value for 'filterByCategoryId'
 *      filterBySearch: // value for 'filterBySearch'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useTransactionsByGroupIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.ITransactionsByGroupIdQuery,
    Types.ITransactionsByGroupIdQueryVariables
  > &
    (
      | {
          variables: Types.ITransactionsByGroupIdQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ITransactionsByGroupIdQuery,
    Types.ITransactionsByGroupIdQueryVariables
  >(TransactionsByGroupIdDocument, options);
}
export function useTransactionsByGroupIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ITransactionsByGroupIdQuery,
    Types.ITransactionsByGroupIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ITransactionsByGroupIdQuery,
    Types.ITransactionsByGroupIdQueryVariables
  >(TransactionsByGroupIdDocument, options);
}
export function useTransactionsByGroupIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.ITransactionsByGroupIdQuery,
        Types.ITransactionsByGroupIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.ITransactionsByGroupIdQuery,
    Types.ITransactionsByGroupIdQueryVariables
  >(TransactionsByGroupIdDocument, options);
}
export type TransactionsByGroupIdQueryHookResult = ReturnType<
  typeof useTransactionsByGroupIdQuery
>;
export type TransactionsByGroupIdLazyQueryHookResult = ReturnType<
  typeof useTransactionsByGroupIdLazyQuery
>;
export type TransactionsByGroupIdSuspenseQueryHookResult = ReturnType<
  typeof useTransactionsByGroupIdSuspenseQuery
>;
export type TransactionsByGroupIdQueryResult = Apollo.QueryResult<
  Types.ITransactionsByGroupIdQuery,
  Types.ITransactionsByGroupIdQueryVariables
>;
export const TransactionsGroupDocument = gql`
  query TransactionsGroup($search: String) {
    transactionsGroup(search: $search) {
      _id
      owner {
        name
        _id
      }
      iconProperties {
        background
        color
        icon
      }
      description
    }
  }
`;

/**
 * __useTransactionsGroupQuery__
 *
 * To run a query within a React component, call `useTransactionsGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsGroupQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useTransactionsGroupQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.ITransactionsGroupQuery,
    Types.ITransactionsGroupQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ITransactionsGroupQuery,
    Types.ITransactionsGroupQueryVariables
  >(TransactionsGroupDocument, options);
}
export function useTransactionsGroupLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ITransactionsGroupQuery,
    Types.ITransactionsGroupQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ITransactionsGroupQuery,
    Types.ITransactionsGroupQueryVariables
  >(TransactionsGroupDocument, options);
}
export function useTransactionsGroupSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.ITransactionsGroupQuery,
        Types.ITransactionsGroupQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.ITransactionsGroupQuery,
    Types.ITransactionsGroupQueryVariables
  >(TransactionsGroupDocument, options);
}
export type TransactionsGroupQueryHookResult = ReturnType<
  typeof useTransactionsGroupQuery
>;
export type TransactionsGroupLazyQueryHookResult = ReturnType<
  typeof useTransactionsGroupLazyQuery
>;
export type TransactionsGroupSuspenseQueryHookResult = ReturnType<
  typeof useTransactionsGroupSuspenseQuery
>;
export type TransactionsGroupQueryResult = Apollo.QueryResult<
  Types.ITransactionsGroupQuery,
  Types.ITransactionsGroupQueryVariables
>;
export const ViewerDocument = gql`
  query Viewer {
    viewer {
      _id
      email
      name
    }
  }
`;

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.IViewerQuery,
    Types.IViewerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.IViewerQuery, Types.IViewerQueryVariables>(
    ViewerDocument,
    options,
  );
}
export function useViewerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.IViewerQuery,
    Types.IViewerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.IViewerQuery, Types.IViewerQueryVariables>(
    ViewerDocument,
    options,
  );
}
export function useViewerSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.IViewerQuery,
        Types.IViewerQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.IViewerQuery,
    Types.IViewerQueryVariables
  >(ViewerDocument, options);
}
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerSuspenseQueryHookResult = ReturnType<
  typeof useViewerSuspenseQuery
>;
export type ViewerQueryResult = Apollo.QueryResult<
  Types.IViewerQuery,
  Types.IViewerQueryVariables
>;
