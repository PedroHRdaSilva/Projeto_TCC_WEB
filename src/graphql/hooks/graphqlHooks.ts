/* eslint-disable */
import * as Types from "../types/graphqlTypes";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;

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
    loginWithCredentials(email: $email, password: $password)
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
