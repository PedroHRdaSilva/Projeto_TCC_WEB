import { unstable_cache } from "next/cache";

import type {
  ITransactionGroupByIdQuery,
  ITransactionGroupByIdQueryVariables,
} from "@/graphql/types/graphqlTypes";

import { createGraphqlClient } from "@/lib/apollo/createGraphqlClient";
import TransactionGroupByIdQuery from "@/graphql/queries/transactions/TransactionGroupByIdQuery";
import { ViewerSession } from "@/lib/auth/actions";

const getTransactionGroupId = unstable_cache(
  async (session: ViewerSession | null, id: string | undefined) => {
    const client = createGraphqlClient(session);

    const { data, errors } = await client.query<
      ITransactionGroupByIdQuery,
      ITransactionGroupByIdQueryVariables
    >({
      query: TransactionGroupByIdQuery,
      variables: { _id: id },
    });

    return { data, errors };
  },
  ["transactionGroup"],
  {
    tags: ["transactionGroup"],
  }
);

export default getTransactionGroupId;
