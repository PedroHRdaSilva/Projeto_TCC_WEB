"use client";

import { NetworkStatus } from "@apollo/client";
import { lightFormat } from "date-fns/lightFormat";

import { useMemo } from "react";

import {
  ActionsRender,
  DescriptionRender,
  MobileSkeleton,
  RowCheckbox,
  SelectAllCheckbox,
  StatusRender,
  TagsRender,
  TransactionsMobileRender,
} from "@/app/finance/transaction/[[...id]]/components/views/TransactionTableRenders";
import type {
  TransactionGroupType,
  TransactionsTypeRow,
} from "@/app/finance/transaction/[[...id]]/components/views/types";
import { useTransactionsByGroupIdQuery } from "@/graphql/hooks/graphqlHooks";

import type { ICategoriesByGroupIdQuery } from "@/graphql/types/graphqlTypes";
import { DataTable, DataTableSkeleton } from "@/lib/ui/table/DataTable";
import { moneyFormatter } from "@/lib/utils/formatters";

import type { ColumnDef } from "@tanstack/react-table";
import TransactionsByGroupIdQuery from "@/graphql/queries/transactions/TransactionsByGroupIdQuery";
import TransactionTotalsQuery from "@/graphql/queries/transactions/TransactionTotalsQuery";

import useFilterQueryState from "@/app/finance/transaction/[[...id]]/components/filter/useFilterQueryState";

interface TransactionTableViewProps {
  group: TransactionGroupType;
  categories: NonNullable<ICategoriesByGroupIdQuery["categoriesByGroupId"]>;
}

export default function TransactionTableView({
  group,
  categories,
}: TransactionTableViewProps) {
  const { filterByPeriod, filterByCategoryId, filterBySearch } =
    useFilterQueryState();

  const {
    data: dataTransactions,
    fetchMore,
    networkStatus,
    loading,
    previousData,
  } = useTransactionsByGroupIdQuery({
    variables: {
      cursor: null,
      filterByCategoryId: filterByCategoryId,
      filterByPeriod: lightFormat(filterByPeriod, "yyyy-MM-dd"),
      filterBySearch: filterBySearch,
      groupId: group._id,
      limit: 30,
    },
  });

  const refetchTransactionsByGroupIdQuery = useMemo(
    () => [
      {
        query: TransactionsByGroupIdQuery,
        variables: {
          cursor: dataTransactions?.transactions.pageInfo.cursor,
          filterByCategoryId: filterByCategoryId,
          filterByPeriod: lightFormat(filterByPeriod, "yyyy-MM-dd"),
          filterBySearch: filterBySearch,
          groupId: group._id,
          limit: 30,
        },
      },
    ],
    [
      dataTransactions,
      filterByCategoryId,
      filterByPeriod,
      filterBySearch,
      group,
    ]
  );
  const refetchTransactionTotalsQuery = useMemo(
    () => [
      {
        query: TransactionTotalsQuery,
        variables: {
          filterByCategoryId: filterByCategoryId,
          filterByPeriod: lightFormat(filterByPeriod, "yyyy-MM-dd"),
          filterBySearch: filterBySearch,
          groupId: group._id,
        },
      },
    ],
    [filterByCategoryId, filterByPeriod, filterBySearch, group._id]
  );

  const transactions =
    (loading && !dataTransactions
      ? previousData?.transactions.nodes
      : dataTransactions?.transactions.nodes) || [];

  const columns: ColumnDef<TransactionsTypeRow>[] = [
    {
      id: "select-col",
      header: ({ table }) => SelectAllCheckbox(table),
      cell: ({ row }) => RowCheckbox(row),
      size: 50,
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: (cell) => DescriptionRender(cell.row.original),
      size: 300,
    },
    {
      accessorKey: "amount",
      header: "Valor",
      cell: (cell) => moneyFormatter.format(cell.getValue() as number),
    },
    {
      accessorKey: "date",
      header: "Data",
      cell: (cell) => cell.getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row, table }) =>
        StatusRender(row.original, refetchTransactionsByGroupIdQuery, table),
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: (cell) => TagsRender(cell.row.original),
    },
    {
      header: "Ações",
      cell: ({ row, table }) =>
        ActionsRender(
          row.original,
          categories,
          group,
          refetchTransactionsByGroupIdQuery,
          refetchTransactionTotalsQuery,
          table
        ),
      size: 100,
      maxSize: 100,
    },
  ];

  if (loading && !transactions && networkStatus !== NetworkStatus.fetchMore) {
    return (
      <DataTableSkeleton
        columns={columns}
        rows={8}
        onMobileRender={MobileSkeleton}
      />
    );
  }

  if (!transactions) {
    return null;
  }

  return (
    <DataTable
      columns={columns}
      data={transactions}
      onMobileRender={(row) =>
        TransactionsMobileRender(
          row,
          categories,
          group,
          refetchTransactionsByGroupIdQuery,
          refetchTransactionTotalsQuery
        )
      }
      onLoadMore={() => {
        if (
          dataTransactions &&
          dataTransactions.transactions.pageInfo.hasNextPage
        ) {
          fetchMore({
            variables: {
              filterByCategoryId,
              filterBySearch,
              groupId: group._id,
              filterByPeriod: lightFormat(filterByPeriod, "yyyy-MM-dd"),
              cursor: dataTransactions.transactions.pageInfo.cursor,
              limit: 30,
            },
          });
        }
      }}
    />
  );
}
