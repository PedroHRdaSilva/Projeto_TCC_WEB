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
        <div className="flex flex-col items-center">
          <div className="flex w-full flex-col items-center justify-center">
            <span className="font-dm-sans text-xl font-bold">
              Você não tem nenhum grupo criado ainda!
            </span>
            <span className="w-[415px] text-center font-dm-sans text-zinc-400">
              Crie um grupo para gerenciar suas despesas pessoais e familiares
              ou outro para dividir contas com amigos.
            </span>
            <TransactionGroupConfig>
              <Button variant="outline" className="mt-6 gap-3">
                <PlusIcon size={16} className="text-gray-500" />
                Criar um grupo agora!
              </Button>
            </TransactionGroupConfig>
          </div>
          <div className="mt-11 w-full max-w-5xl">
            <Separator className="mb-3 h-2" />
            <span className="font-medium text-foreground">
              Domine todas as funcionalidades
            </span>
            <div className="mt-6 flex justify-between">
              {infoCards.map((node) => (
                <div
                  key={node.id}
                  className="flex max-w-xl gap-8 border border-border bg-background p-5"
                >
                  <div className="w-56">
                    <h1 className="mb-1 font-dm-sans font-medium text-foreground">
                      {node.title}
                    </h1>
                    <span className="font-dm-sans text-muted-foreground">
                      {node.subTitle}
                    </span>
                    <div className="mt-3">
                      <Link href="#" className="font-sans text-sm underline">
                        Ver mais
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppLayoutPage>
    );
  }
  return (
    <AppLayoutPage className="xl:space-y-6">
      <div className="h-full">
        <TransactionGroupInformation group={data.transactionGroupById} />
      </div>
    </AppLayoutPage>
  );
}
const infoCards = [
  {
    id: 1,
    title: "Saiba mais sobre os grupos",
    subTitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut urna eget tellus dignissim auctor quis a nulla. Nunc dignissim molestie elit at ...",
  },
  {
    id: 2,
    title: "Saiba mais sobre os grupos",
    subTitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut urna eget tellus dignissim auctor quis a nulla. Nunc dignissim molestie elit at ...",
  },
];
