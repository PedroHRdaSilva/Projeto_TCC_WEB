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
import routes from "@/utils/routes";
import Link from "next/link";

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

  if (!data.transactionGroupById) {
    return (
      <AppLayoutPage>
        <div className="flex h-full min-h-[80vh] flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-dashed border-zinc-300 p-10 shadow-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-zinc-800">
                Nenhum grupo de transações encontrado
              </h2>
              <p className="max-w-md text-sm text-zinc-500">
                Para visualizar gráficos e relatórios financeiros, crie um grupo
                de transações e organize suas movimentações de forma
                inteligente.
              </p>
            </div>
            <Link
              href={routes.finance.transactions}
              className="mt-4 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Criar grupo agora
            </Link>
          </div>
        </div>
      </AppLayoutPage>
    );
  }

  if (errors) {
    return (
      <ServerError
        error={errors?.[0] ?? { message: "Transaction group not found" }}
      />
    );
  }

  return (
    <AppLayoutPage className="overflow-y-auto">
      <DashboardContent group={data.transactionGroupById} />
    </AppLayoutPage>
  );
}
