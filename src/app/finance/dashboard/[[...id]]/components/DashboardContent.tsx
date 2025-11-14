"use client";

import { useQueryState } from "nuqs";

import type { ITransactionGroupByIdQuery } from "@/graphql/types/graphqlTypes";
import { parseAsDate } from "@/app/finance/transaction/[[...id]]/components/filter/urlParsers";
import ChartFilter from "@/app/finance/dashboard/[[...id]]/components/ChartFilter";
import { MonthlyRevenueVsExpensesChart } from "@/app/finance/dashboard/[[...id]]/components/MonthlyRevenueVsExpensesChart";
import { MonthlySpendingByCategoryChart } from "@/app/finance/dashboard/[[...id]]/components/MonthlySpendingByCategoryChart";

import { arrayOfPossibleIcons, cn, hexToRgba } from "@/lib/utils/utils";
import { SettingsIcon, TrophyIcon } from "lucide-react";
import TransactionsGroupConfig from "@/app/finance/transaction/[[...id]]/components/group/TransactionsGroupConfig";
import TransactionGroupSelection from "@/app/finance/transaction/[[...id]]/components/group/TransactionGroupSelection";
import TreemapCategorysChart from "@/app/finance/dashboard/[[...id]]/components/TreemapCategorysChart";
import CarouselCreditCard from "@/app/finance/dashboard/[[...id]]/components/CarouselCreditCard";

interface DashboardContentProps {
  group: NonNullable<ITransactionGroupByIdQuery["transactionGroupById"]>;
}
export default function DashboardContent({ group }: DashboardContentProps) {
  const { iconProperties, description } = group;
  const [filterByStartMonth] = useQueryState("start", parseAsDate);
  const [filterByEndMonth] = useQueryState("end", parseAsDate);
  const IconComponent =
    arrayOfPossibleIcons.find(
      (node) => node.displayName === iconProperties.icon
    ) || TrophyIcon;
  const dashboard = true;
  return (
    <div>
      <div
        className={cn(
          "-mx-4 -mt-4 flex h-32 bg-white p-5 border  ",
          "xl:mx-0 xl:mt-0 xl:h-24 xl:w-full xl:max-w-[340px] xl:items-center xl:rounded-lg  xl:p-6"
        )}
      >
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full xl:rounded-lg"
          )}
          style={{
            backgroundColor: hexToRgba(iconProperties.background, 0.5),
          }}
        >
          <IconComponent size={24} style={{ color: iconProperties.color }} />
        </div>

        <div className="mx-3 flex flex-col gap-0.5">
          <p className="text-sm font-medium text-black">{description}</p>
        </div>

        <div className="ml-auto flex  items-center justify-center gap-2">
          <TransactionGroupSelection dashboard={true} />
          {!dashboard && (
            <TransactionsGroupConfig initialValues={group}>
              <button
                type="button"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg bg-gray-300 ",
                  "hover:bg-accent hover:text-foreground focus:outline-none"
                )}
              >
                <SettingsIcon size={24} />
              </button>
            </TransactionsGroupConfig>
          )}
        </div>
      </div>

      <div className="mt-5  ">
        <ChartFilter />
      </div>
      <div className="flex  w-full flex-col space-y-5 lg:mt-10 ">
        <div className="w-full min-h-[350px] flex flex-col lg:flex-row gap-4">
          <div className="flex-[3]">
            <MonthlyRevenueVsExpensesChart
              groupId={group._id}
              filterByStartMonth={filterByStartMonth}
              filterByEndMonth={filterByEndMonth}
            />
          </div>

          <div className="flex-[1]">
            <CarouselCreditCard groupId={group._id} />
          </div>
        </div>

        <div className="w-full min-h-[300px] flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <MonthlySpendingByCategoryChart
              groupId={group._id}
              filterByStartMonth={filterByStartMonth}
              filterByEndMonth={filterByEndMonth}
            />
          </div>
          <div className="flex-1">
            <TreemapCategorysChart
              groupId={group._id}
              filterByStartMonth={filterByStartMonth}
              filterByEndMonth={filterByEndMonth}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
