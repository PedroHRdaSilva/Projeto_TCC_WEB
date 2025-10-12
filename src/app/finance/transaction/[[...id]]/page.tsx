import TransactionGroupInformation from "@/app/finance/transaction/[[...id]]/components/group/TransactionGroupInformation";
import AppLayoutPage from "@/app/layout/AppLayoutPage";
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
    <AppLayoutPage className="xl:space-y-6">
      <div className="h-full">
        <TransactionGroupInformation group={data.transactionGroupById} />
      </div>
    </AppLayoutPage>
  );
}
