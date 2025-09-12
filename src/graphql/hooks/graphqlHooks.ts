/* eslint-disable */
import * as Types from "../types/graphqlTypes";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;

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
      isAdmin
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
