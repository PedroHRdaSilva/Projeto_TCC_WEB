import TransactionGroupInformation from "@/app/finance/transaction/[[...id]]/components/group/TransactionGroupInformation";
import TransactionGroupByIdQuery from "@/graphql/queries/transactions/TransactionGroupByIdQuery";
import {
  ITransactionGroupByIdQuery,
  ITransactionGroupByIdQueryVariables,
} from "@/graphql/types/graphqlTypes";

import { getAuthenticatedClient } from "@/lib/utils/server-utils";
import { getParamStringValue } from "@/lib/utils/utils";

interface TransactionsPageProps {
  params: Promise<{
    id: string[];
  }>;
}
export default async function TransactionsPage(props: TransactionsPageProps) {
  const params = await props.params;
  const id = getParamStringValue(params, "id");

  const apolloClient = await getAuthenticatedClient();
  const { data } = await apolloClient.query<
    ITransactionGroupByIdQuery,
    ITransactionGroupByIdQueryVariables
  >({
    query: TransactionGroupByIdQuery,
    variables: { _id: id },
  });

  if (!data || !data.transactionGroupById) {
    return null;
  }
  return (
    <div className="flex w-screen h-screen">
      <TransactionGroupInformation group={data.transactionGroupById} />
    </div>
  );
}
