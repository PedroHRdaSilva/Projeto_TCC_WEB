import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { EllipsisIcon, PencilIcon, TrophyIcon } from "lucide-react";

import type {
  TransactionGroupType,
  TransactionsTypeRow,
} from "@/app/finance/transaction/[[...id]]/components/views/types";
import type { ICategoriesByGroupIdQuery } from "@/graphql/types/graphqlTypes";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/ui/tooltip";
import { arrayOfPossibleIcons, hexToRgba } from "@/lib/utils/utils";

import type { InternalRefetchQueriesInclude } from "@apollo/client";
import CreateTransaction from "@/app/finance/transaction/[[...id]]/components/group/CreateTransaction";
import { Skeleton } from "@/lib/ui/skeleton";
import TransactionDeleteAlert from "@/app/finance/transaction/[[...id]]/components/views/TransactionDeleteAlert";
import { Row, Table } from "@tanstack/react-table";
import IndeterminateCheckbox from "@/lib/ui/IndeterminateCheckbox";
import StatusPopover from "@/app/finance/transaction/[[...id]]/components/group/StatusPopover";

export function TransactionsMobileRender(
  row: TransactionsTypeRow,
  categories: NonNullable<ICategoriesByGroupIdQuery["categoriesByGroupId"]>,
  transactionGroup: TransactionGroupType,
  refetchQueries: InternalRefetchQueriesInclude,
  refetchTransactionTotalsQuery: InternalRefetchQueriesInclude
) {
  const IconComponent =
    arrayOfPossibleIcons.find(
      (node) => node.displayName === row.category?.iconProperties?.icon
    ) || TrophyIcon;

  const iconStyle = {
    color: row.category.iconProperties.color,
    backgroundColor: hexToRgba(row.category.iconProperties.background, 1),
  };
  const moneyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="flex w-full items-start justify-between">
      <div className="flex w-full flex-col space-x-3 space-y-4 rounded-lg bg-background p-4 pt-4">
        <span className="ml-3 flex justify-between text-base capitalize text-muted-foreground">
          {format(row.date, "d MMMM yyyy", {
            locale: ptBR,
          })}
          <div>
            <IconComponent
              className="rounded-full p-1 bg-white"
              style={iconStyle}
            />
          </div>
        </span>
        <div className="text-base">{DescriptionRender(row)}</div>
        <span className="text-base font-bold text-destructive">
          {moneyFormatter.format(row.amount)}
        </span>
        <div className="flex items-center space-x-2 text-base">
          {StatusRender(row, refetchQueries)}
          <div className="mr-auto flex">{TagsRender(row)}</div>
          <div className="flex w-full">
            {ActionsRender(
              row,
              categories,
              transactionGroup,
              refetchQueries,
              refetchTransactionTotalsQuery
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ActionsRender(
  cell: TransactionsTypeRow,
  categories: NonNullable<ICategoriesByGroupIdQuery["categoriesByGroupId"]>,
  transactionGroup: TransactionGroupType,
  refetchQueries: InternalRefetchQueriesInclude,
  refetchTransactionTotalsQuery: InternalRefetchQueriesInclude
) {
  const initialValues = cell;
  return (
    <>
      <div className="hidden items-center space-x-2 lg:flex">
        <TransactionDeleteAlert
          refetchQueries={[...refetchQueries, ...refetchTransactionTotalsQuery]}
          transactionId={initialValues._id}
        />

        <CreateTransaction
          refetchQueries={[...refetchQueries, ...refetchTransactionTotalsQuery]}
          transactionGroup={transactionGroup}
          categories={categories}
          initialValues={initialValues}
        >
          <PencilIcon size={19} className="stroke-muted-foreground stroke-1" />
        </CreateTransaction>
      </div>
      <div className="flex w-full lg:hidden">
        <Popover modal={true}>
          <PopoverTrigger className="ml-auto flex lg:hidden">
            <EllipsisIcon className="stroke-muted-foreground" />
          </PopoverTrigger>

          <PopoverContent align="end" sideOffset={10} className="w-fit">
            <ul className="space-y-4 text-sm text-foreground">
              <li>
                <TransactionDeleteAlert
                  refetchQueries={[
                    ...refetchQueries,
                    ...refetchTransactionTotalsQuery,
                  ]}
                  transactionId={initialValues._id}
                />
              </li>
              <li>
                <CreateTransaction
                  refetchQueries={[
                    ...refetchQueries,
                    ...refetchTransactionTotalsQuery,
                  ]}
                  transactionGroup={transactionGroup}
                  categories={categories}
                  initialValues={initialValues}
                >
                  <PencilIcon
                    size={20}
                    className="stroke-muted-foreground stroke-1"
                  />
                </CreateTransaction>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export function TagsRender(cell: TransactionsTypeRow) {
  const credit = cell.creditCard;
  const recurring = cell.isRecurringPayment;

  return (
    <div className="flex w-full items-center space-x-4">
      <div className="flex space-x-2">
        <TooltipProvider>
          {credit && TextPreview(credit.description)}
        </TooltipProvider>
        {recurring && (
          <span className="rounded bg-muted p-1 px-2 lg:px-2">Recorrente</span>
        )}
      </div>
    </div>
  );
}
export function RowCheckbox(row: Row<TransactionsTypeRow>) {
  return (
    <IndeterminateCheckbox
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      onChange={row.getToggleSelectedHandler()}
    />
  );
}
export function SelectAllCheckbox(table: Table<TransactionsTypeRow>) {
  return (
    <IndeterminateCheckbox
      checked={table.getIsAllRowsSelected()}
      indeterminate={table.getIsSomeRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
    />
  );
}
export function StatusRender(
  cell: TransactionsTypeRow,
  refetchQueries: InternalRefetchQueriesInclude,
  table?: Table<TransactionsTypeRow>
) {
  const selectedRows = table?.getSelectedRowModel().rows.length
    ? table.getSelectedRowModel().rows.map((r) => r.original._id)
    : [cell._id];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="w-20 rounded bg-muted p-1 px-2 lg:px-2">
        {cell.status?.toUpperCase() === "PAID" ? "Pago" : "Pendente"}
      </span>
      <div className="flex items-center justify-center">
        <StatusPopover
          transactionIds={selectedRows}
          refetchQueries={refetchQueries}
          onSuccess={() => table?.resetRowSelection()}
        />
      </div>
    </div>
  );
}

export function DescriptionRender(cell: TransactionsTypeRow) {
  const IconComponent =
    arrayOfPossibleIcons.find(
      (node) => node.displayName === cell.category?.iconProperties?.icon
    ) || TrophyIcon;

  return (
    <div className="flex w-full items-center justify-start xl:space-x-3">
      <div
        className="hidden xl:block"
        style={{
          color: cell.category.iconProperties.color,
        }}
      >
        <div className="rounded-full bg-gray-300 p-2">
          <IconComponent size={16} />
        </div>
      </div>

      <span>{cell.description}</span>

      {cell.installments && (
        <span className="font-dm-sans text-base">
          - ({cell.installments.current} / {cell.installments.total})
        </span>
      )}
    </div>
  );
}

export function MobileSkeleton() {
  return (
    <div className="flex flex-col space-y-1">
      <Skeleton className="h-4 w-32 bg-secondary" />
      <Skeleton className="h-3 w-20 bg-secondary" />
    </div>
  );
}

export function TextPreview(text: string) {
  return (
    <>
      {/* Mobile: Popover */}
      <div className="block lg:hidden">
        <Popover>
          <PopoverTrigger asChild={true}>
            <div className="w-24 overflow-hidden text-ellipsis whitespace-nowrap rounded bg-muted p-1 px-2">
              {text}
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex w-full">
            <p>{text}</p>
          </PopoverContent>
        </Popover>
      </div>

      {/* Desktop: Tooltip */}
      <div className="hidden lg:block">
        <Tooltip>
          <TooltipTrigger asChild={true}>
            <div className="w-28 overflow-hidden text-ellipsis whitespace-nowrap rounded bg-muted p-1 px-2">
              {text}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
}
