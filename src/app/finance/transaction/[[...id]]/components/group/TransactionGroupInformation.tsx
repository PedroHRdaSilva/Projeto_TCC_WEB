"use client";
import { SettingsIcon, TrophyIcon } from "lucide-react";

import type { ITransactionGroupByIdQuery } from "@/graphql/types/graphqlTypes";
import { arrayOfPossibleIcons, cn, hexToRgba } from "@/lib/utils/utils";
import TransactionGroupSelection from "@/app/finance/transaction/[[...id]]/components/group/TransactionGroupSelection";
import TransactionsGroupConfig from "@/app/finance/transaction/[[...id]]/components/group/TransactionsGroupConfig";
import IncomeExpenses from "@/app/finance/transaction/[[...id]]/components/group/IncomeExpenses";

interface TransactionsPageProps {
  group: NonNullable<ITransactionGroupByIdQuery["transactionGroupById"]>;
  dashboard?: boolean;
}

export default function TransactionGroupInformation({
  group,
}: TransactionsPageProps) {
  const { iconProperties, description } = group;

  const IconComponent =
    arrayOfPossibleIcons.find(
      (node) => node.displayName === iconProperties.icon
    ) || TrophyIcon;

  return (
    <div className="flex w-full bg-slate-900 p-5">
      <div
        className={cn(
          "-mx-4 -mt-4 flex h-32 bg-slate-700 p-5 border ",
          "xl:mx-0 xl:mt-0 xl:h-24 xl:w-full xl:max-w-[340px] xl:items-center xl:rounded-lg  xl:p-6"
        )}
      >
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full xl:rounded-lg"
          )}
          style={{
            backgroundColor: hexToRgba(iconProperties.background, 0.2),
          }}
        >
          <IconComponent size={24} style={{ color: iconProperties.color }} />
        </div>

        <div className="mx-3 flex flex-col gap-0.5">
          <p className="text-sm font-medium text-foreground">{description}</p>
        </div>

        <div className="ml-auto flex h-fit items-center justify-center gap-2">
          <TransactionGroupSelection />

          <TransactionsGroupConfig initialValues={group}>
            <button
              type="button"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg bg-secondary ",
                "hover:bg-accent hover:text-foreground focus:outline-none"
              )}
            >
              <SettingsIcon size={24} className="" />
            </button>
          </TransactionsGroupConfig>
        </div>
      </div>
      <div className=" w-full  justify-end flex">
        <IncomeExpenses group={group} />
      </div>
    </div>
  );
}
