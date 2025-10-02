// import { unstable_cache } from "next/cache";

// import type {
//   ITransactionGroupByIdQuery,
//   ITransactionGroupByIdQueryVariables,
// } from "@/graphql/types/graphqlTypes";

// import type { JWTVerifyResult } from "jose";
// import TransactionGroupByIdQuery from "@/graphql/queries/transactions/TransactionGroupByIdQuery";
// import { createGraphqlClient } from "@/lib/apollo/createGraphqlClient";

// const getTransactionGroupId = unstable_cache(
//   async (
//     session: JWTVerifyResult<CredentialsPayload> | null,
//     id: string | undefined
//   ) => {
//     const client = createGraphqlClient(session);

//     const { data, errors } = await client.query<
//       ITransactionGroupByIdQuery,
//       ITransactionGroupByIdQueryVariables
//     >({
//       query: TransactionGroupByIdQuery,
//       variables: { _id: id },
//     });

//     return { data, errors };
//   },
//   ["transactionGroup"],
//   {
//     tags: ["transactionGroup"],
//   }
// );

// export default getTransactionGroupId;
