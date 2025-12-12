"use client";
import { PlusIcon, SettingsIcon, TrophyIcon } from "lucide-react";

import type { ITransactionGroupByIdQuery } from "@/graphql/types/graphqlTypes";
import { arrayOfPossibleIcons, cn, hexToRgba } from "@/lib/utils/utils";
import TransactionGroupSelection from "@/app/finance/transaction/[[...id]]/components/group/TransactionGroupSelection";
import TransactionsGroupConfig from "@/app/finance/transaction/[[...id]]/components/group/TransactionsGroupConfig";
import IncomeExpenses from "@/app/finance/transaction/[[...id]]/components/group/IncomeExpenses";
import TransactionsFilter from "@/app/finance/transaction/[[...id]]/components/filter/TransactionsFilter";
import CreateTransaction from "@/app/finance/transaction/[[...id]]/components/group/CreateTransaction";
import TransactionsByGroupIdQuery from "@/graphql/queries/transactions/TransactionsByGroupIdQuery";
import { lightFormat } from "date-fns";
import TransactionTotalsQuery from "@/graphql/queries/transactions/TransactionTotalsQuery";

import { useCategoriesByGroupIdQuery } from "@/graphql/hooks/graphqlHooks";
import TransactionTableView from "@/app/finance/transaction/[[...id]]/components/views/TransactionTableView";
import useFilterQueryState from "@/app/finance/transaction/[[...id]]/components/filter/useFilterQueryState";
import FooterMobile from "@/app/FooterMobile";
import TransationsFilterMobile from "@/app/finance/transaction/[[...id]]/components/filter/TransationsFilterMobile";
import { useEffect } from "react";

interface TransactionsPageProps {
  group: NonNullable<ITransactionGroupByIdQuery["transactionGroupById"]>;
  dashboard?: boolean;
}

export default function TransactionGroupInformation({
  group,
}: TransactionsPageProps) {
  useEffect(() => {
    if (group?._id) {
      localStorage.setItem("lastTransactionGroupId", group._id);
    }
  }, [group?._id]);
  const { iconProperties, description } = group;
  const { filterByPeriod, filterByCategoryId, filterBySearch } =
    useFilterQueryState();

  const { data: dataCategories } = useCategoriesByGroupIdQuery({
    variables: {
      transactionGroupId: group._id,
    },
  });

  const IconComponent =
    arrayOfPossibleIcons.find(
      (node) => node.displayName === iconProperties.icon
    ) || TrophyIcon;

  return (
    <div className="flex flex-col w-full bg-gray-200 p-5 gap-5 h-full  ">
      <div className="flex w-full flex-col xl:flex-row ">
        <div
          className={cn(
            "-mx-4 -mt-4 flex h-32 bg-white p-5 border items-center ",
            "xl:mx-0 xl:mt-0 xl:h-24 xl:w-full xl:max-w-[300px] xl:items-center xl:rounded-lg",
            "2xl:max-w-[370px]"
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
            <TransactionGroupSelection groupIdPage={group._id} />

            <TransactionsGroupConfig initialValues={group}>
              <button
                type="button"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg bg-gray-300 ",
                  "hover:bg-accent hover:text-foreground focus:outline-none"
                )}
              >
                <SettingsIcon size={24} className="" />
              </button>
            </TransactionsGroupConfig>
          </div>
        </div>
        <div className=" w-full  justify-end flex mt-5 xl:mt-0">
          <IncomeExpenses group={group} />
        </div>
      </div>
      <div className="mt-10 xl:flex w-full justify-between hidden">
        <div className="flex w-full">
          <TransactionsFilter
            groupId={group._id}
            categories={dataCategories?.categoriesByGroupId || []}
          />
        </div>
        <div className="flex w-full justify-end">
          <CreateTransaction
            refetchQueries={[
              {
                query: TransactionsByGroupIdQuery,
                variables: {
                  cursor: null,
                  filterByCategoryId: filterByCategoryId,
                  filterByPeriod: lightFormat(filterByPeriod, "yyyy-MM-dd"),
                  filterBySearch: filterBySearch,
                  groupId: group._id,
                  limit: 30,
                },
              },
              {
                query: TransactionTotalsQuery,
                variables: {
                  groupId: group._id,
                  filterByPeriod: lightFormat(filterByPeriod, "yyyy-MM-dd"),
                  filterByCategoryId,
                  filterBySearch,
                },
              },
            ]}
            transactionGroup={group}
            categories={dataCategories?.categoriesByGroupId || []}
          >
            <div className="flex items-center space-x-3  rounded-lg border border-border bg-white p-2">
              <PlusIcon size={16} className="text-secondary-foreground" />
              <span className="font-dm-sans text-sm text-secondary-foreground">
                Nova Transação
              </span>
            </div>
          </CreateTransaction>
        </div>
      </div>
      <TransactionTableView
        group={group}
        categories={dataCategories?.categoriesByGroupId || []}
      />
      <FooterMobile>
        <TransationsFilterMobile
          group={group}
          categories={dataCategories?.categoriesByGroupId || []}
        />
      </FooterMobile>
    </div>
  );
}
