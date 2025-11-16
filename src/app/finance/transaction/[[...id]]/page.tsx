import TransactionGroupInformation from "@/app/finance/transaction/[[...id]]/components/group/TransactionGroupInformation";
import TransactionGroupConfig from "@/app/finance/transaction/[[...id]]/components/group/TransactionsGroupConfig";
import AppLayoutPage from "@/app/layout/AppLayoutPage";
import TransactionGroupByIdQuery from "@/graphql/queries/transactions/TransactionGroupByIdQuery";
import {
  ITransactionGroupByIdQuery,
  ITransactionGroupByIdQueryVariables,
} from "@/graphql/types/graphqlTypes";
import { Button } from "@/lib/ui/button";
import { Separator } from "@/lib/ui/separator";

import { getAuthenticatedClient } from "@/lib/utils/server-utils";
import { getParamStringValue } from "@/lib/utils/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

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
    return (
      <AppLayoutPage>
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
          <div className="flex flex-col items-center justify-between rounded-2xl border border-border bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] p-8 shadow-sm transition-all hover:shadow-md max-w-md text-center">
            <div>
              <h3 className="mb-3 font-dm-sans text-xl font-semibold text-foreground">
                Crie seu primeiro grupo de transações 💰
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Organize suas finanças com facilidade! Crie um grupo para
                acompanhar entradas e saídas, dividir gastos com amigos e ter
                controle total das suas despesas em um só lugar.
              </p>
            </div>

            <TransactionGroupConfig>
              <Button
                variant="default"
                size="lg"
                className="mt-6 gap-2 rounded-xl px-6 py-5 shadow-sm"
              >
                <PlusIcon size={18} className="text-white" />
                Criar grupo agora
              </Button>
            </TransactionGroupConfig>
          </div>
        </div>
      </AppLayoutPage>
    );
  }
  return (
    <AppLayoutPage className="xl:space-y-6 ">
      <div className="h-full">
        <TransactionGroupInformation group={data.transactionGroupById} />
      </div>
    </AppLayoutPage>
  );
}
