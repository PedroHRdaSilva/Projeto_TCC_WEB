import DashboardContent from "@/app/finance/dashboard/[[...id]]/components/DashboardContent";
import AppLayoutPage from "@/app/layout/AppLayoutPage";
import TransactionGroupByIdQuery from "@/graphql/queries/transactions/TransactionGroupByIdQuery";
import {
  ITransactionGroupByIdQuery,
  ITransactionGroupByIdQueryVariables,
} from "@/graphql/types/graphqlTypes";
import ServerError from "@/lib/apollo/ServerError";
import { getAuthenticatedClient } from "@/lib/utils/server-utils";
import { getParamStringValue } from "@/lib/utils/utils";

interface DashboardPageProps {
  params: Promise<{
    id: string[];
  }>;
}
export default async function DashboardPage(props: DashboardPageProps) {
  const params = await props.params;
  const id = getParamStringValue(params, "id");

  const apolloClient = await getAuthenticatedClient();
  const { data, errors } = await apolloClient.query<
    ITransactionGroupByIdQuery,
    ITransactionGroupByIdQueryVariables
  >({
    query: TransactionGroupByIdQuery,
    variables: { _id: id },
  });

  if (errors || !data.transactionGroupById) {
    return (
      <ServerError
        error={errors?.[0] ?? { message: "Transaction group not found" }}
      />
    );
  }

  return (
    <AppLayoutPage>
      <DashboardContent group={data.transactionGroupById} />
    </AppLayoutPage>
  );
}
