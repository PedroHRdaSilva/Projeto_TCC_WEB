import { ArrowDown, ArrowUp } from "lucide-react";

import { lightFormat, startOfMonth } from "date-fns";
import { moneyFormatter } from "@/lib/utils/formatters";
import { Skeleton } from "@/lib/ui/skeleton";
import { ITransactionGroupByIdQuery } from "@/graphql/types/graphqlTypes";
import { useTransactionTotalsQuery } from "@/graphql/hooks/graphqlHooks";

interface TransactionSummaryProps {
  group: NonNullable<ITransactionGroupByIdQuery["transactionGroupById"]>;
}

export default function IncomeExpenses({ group }: TransactionSummaryProps) {
  const date = startOfMonth(new Date());
  const filterByPeriod = date;
  const filterBySearch = "";
  const filterByCategoryId = undefined;

  const { data, previousData } = useTransactionTotalsQuery({
    variables: {
      groupId: group._id,
      filterByPeriod: lightFormat(filterByPeriod, "yyyy-MM-dd"),
      filterByCategoryId,
      filterBySearch,
    },
  });

  const transactionTotals =
    data?.transactionTotals || previousData?.transactionTotals;

  if (!transactionTotals) {
    return (
      <div>
        <div className="hidden space-x-4 xl:flex">
          <Skeleton className="flex h-24 w-60 flex-col gap-4 rounded-lg bg-background p-4 font-dm-sans text-sm"></Skeleton>
          <Skeleton className="flex h-24 w-60 flex-col gap-4 rounded-lg bg-background p-4 font-dm-sans text-sm"></Skeleton>
          <Skeleton className="flex h-24 w-60 flex-col gap-4 rounded-lg bg-background p-4 font-dm-sans text-sm"></Skeleton>
        </div>
        <div className="flex space-x-4 xl:hidden">
          <Skeleton className="grid h-[153px] w-[343px] grid-cols-2 grid-rows-2 rounded-xl bg-background px-8 py-4">
            <div className="flex flex-col items-center border-b border-r border-border pb-2"></div>
            <div className="flex flex-col items-center border-b border-border pb-2"></div>
            <div className="flex flex-col items-center border-r border-border pt-2"></div>
            <div className="flex flex-col items-center pt-2"></div>
          </Skeleton>
        </div>
      </div>
    );
  }

  const { revenue, expense, balance } = transactionTotals;

  return (
    <>
      <div className="hidden w-full flex-col gap-5 xl:flex xl:flex-row justify-end">
        <div className="flex gap-4">
          <div className="flex h-24 w-60 flex-col gap-4 rounded-lg bg-background p-4 font-dm-sans text-sm">
            <span className="text-secondary-foreground">Receitas</span>
            <div className="flex">
              <span className="font-dm-sans text-lg font-bold text-primary">
                {moneyFormatter.format(revenue.total)}
              </span>
            </div>
            {revenue.percentageVariation !== 0 && (
              <span className="ml-auto flex items-center font-dm-sans text-sm font-bold text-primary">
                {revenue.percentageVariation} % <ArrowUp />
              </span>
            )}
          </div>

          <div className="flex h-24 w-60 flex-col gap-4 rounded-lg bg-background p-4 font-dm-sans text-sm">
            <span className="text-secondary-foreground">Despesas</span>
            <div className="flex">
              <span className="font-dm-sans text-lg font-bold text-destructive">
                {moneyFormatter.format(expense.total)}
              </span>
              {expense.percentageVariation !== 0 && (
                <span className="ml-auto flex items-center font-dm-sans text-sm font-bold text-destructive">
                  {expense.percentageVariation.toFixed(2)} %
                  {expense.percentageVariation > 0 ? (
                    <ArrowUp />
                  ) : (
                    <ArrowDown />
                  )}
                </span>
              )}
            </div>
          </div>

          <div className="flex h-24 w-60 flex-col gap-4 rounded-lg bg-background p-4 font-dm-sans text-sm">
            <span className="text-secondary-foreground">Saldo</span>
            <div className="flex">
              <span
                className={`font-dm-sans text-lg font-bold ${
                  balance.total < 0 ? "text-destructive" : "text-primary"
                }`}
              >
                {moneyFormatter.format(balance.total)}
              </span>
              {balance.percentageVariation !== 0 && (
                <span
                  className={`ml-auto flex items-center font-dm-sans text-sm font-bold ${
                    balance.percentageVariation < 0
                      ? "text-destructive"
                      : "text-primary"
                  }`}
                >
                  {balance.percentageVariation.toFixed(2)} %
                  {expense.percentageVariation > 0 ? (
                    <ArrowUp className="text-primary" />
                  ) : (
                    <ArrowDown className="text-destructive" />
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full xl:hidden">
        <div className="grid h-[153px] w-full grid-cols-2 grid-rows-2 rounded-xl bg-background px-8 py-4">
          <div className="flex flex-col items-center border-b border-r border-border pb-2">
            <span className="font-dm-sans text-xs text-secondary-foreground">
              Saldo
            </span>
            <span
              className={`mt-2 font-dm-sans text-sm ${
                balance.total < 0 ? "text-destructive" : "text-primary"
              }`}
            >
              {moneyFormatter.format(balance.total)}
            </span>
          </div>

          <div className="flex flex-col items-center border-b border-border pb-2">
            <span className="font-dm-sans text-xs text-secondary-foreground">
              A pagar
            </span>
            <span className="mt-2 font-dm-sans text-sm text-destructive">
              {moneyFormatter.format(0)}
            </span>
          </div>

          <div className="flex flex-col items-center border-r border-border pt-2">
            <span className="font-dm-sans text-xs text-secondary-foreground">
              Receitas
            </span>
            <span className="mt-2 font-dm-sans text-sm text-primary">
              {moneyFormatter.format(revenue.total)}
            </span>
          </div>

          <div className="flex flex-col items-center pt-2">
            <span className="font-dm-sans text-xs text-secondary-foreground">
              Despesas
            </span>
            <span className="mt-2 font-dm-sans text-sm text-destructive">
              {moneyFormatter.format(expense.total)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
