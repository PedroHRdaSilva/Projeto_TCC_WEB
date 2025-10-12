"use client";
import { startOfMonth } from "date-fns";
import { format } from "date-fns/format";
import { getMonth } from "date-fns/getMonth";
import { getYear } from "date-fns/getYear";
import { lightFormat } from "date-fns/lightFormat";
import { ptBR } from "date-fns/locale";
import { parseISO } from "date-fns/parseISO";
import {
  CalendarDays,
  ChevronDown,
  Plus,
  SearchIcon,
  SlidersHorizontal,
} from "lucide-react";

import type {
  ICategoriesByGroupIdQuery,
  ITransactionGroupByIdQuery,
} from "@/graphql/types/graphqlTypes";
import Calendar from "@/lib/ui/calendar";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/lib/ui/drawer";
import { Input } from "@/lib/ui/input";
import { cn } from "@/lib/utils/utils";
import useFilterQueryState from "@/app/finance/transaction/[[...id]]/components/filter/useFilterQueryState";
import CreateTransaction from "@/app/finance/transaction/[[...id]]/components/group/CreateTransaction";
import TransactionsByGroupIdQuery from "@/graphql/queries/transactions/TransactionsByGroupIdQuery";
import TransactionTotalsQuery from "@/graphql/queries/transactions/TransactionTotalsQuery";
import ComboboxCategories from "@/app/finance/transaction/[[...id]]/components/filter/ComboboxCategories";

interface TransationsFilterMobileProps {
  group: NonNullable<ITransactionGroupByIdQuery["transactionGroupById"]>;
  categories: NonNullable<ICategoriesByGroupIdQuery["categoriesByGroupId"]>;
}

export default function TransationsFilterMobile({
  group,
  categories,
}: TransationsFilterMobileProps) {
  const {
    filterByCategoryId,
    filterBySearch,
    filterByPeriod,
    setFilterByCategoryId,
    setFilterBySearch,
    setFilterByPeriod,
  } = useFilterQueryState();

  const currentMonth = getMonth(filterByPeriod) + 1;
  const currentYear = getYear(filterByPeriod);
  return (
    <div className="flex justify-between px-14 py-2">
      <div>
        <div className="flex flex-col items-center">
          <CreateTransaction
            transactionGroup={group}
            categories={categories}
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
                  filterByPeriod: lightFormat(
                    startOfMonth(filterByPeriod),
                    "yyyy-MM-dd"
                  ),
                  filterByCategoryId,
                  filterBySearch,
                },
              },
            ]}
          >
            <Plus size={30} />
          </CreateTransaction>
          <span className="text-sm">novo</span>
        </div>
      </div>
      <div>
        <div>
          <Drawer>
            <DrawerTrigger className="relative flex items-center justify-center rounded-md">
              <SlidersHorizontal size={30} />
            </DrawerTrigger>

            <DrawerContent className="px-4">
              <div className="mx-auto flex w-full flex-col space-y-4">
                <DrawerHeader>
                  <DrawerTitle>Filtros</DrawerTitle>
                  <DrawerDescription>Gerais</DrawerDescription>
                </DrawerHeader>
                <div className="relative flex flex-grow xl:w-60 xl:flex-grow-0">
                  <SearchIcon
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-foreground"
                  />
                  <Input
                    type="text"
                    placeholder="Busque aqui"
                    className={cn(
                      "flex h-9 bg-background px-10 opacity-70 placeholder:text-secondary-foreground",
                      "border border-border"
                    )}
                    onChange={(e) => {
                      setFilterBySearch(e.target.value);
                    }}
                    value={filterBySearch}
                  />
                </div>
                <div className="flex h-10 space-x-4">
                  <div className="flex rounded-md border border-border">
                    <Calendar
                      onSelect={(value) => {
                        setFilterByPeriod(parseISO(value));
                      }}
                      defaultValues={{ month: currentMonth, year: currentYear }}
                      className={cn(
                        "flex w-full items-center gap-3 whitespace-nowrap rounded-lg bg-background px-4 text-sm opacity-70",
                        "xl:bg-secondary xl:opacity-100"
                      )}
                    >
                      <div>
                        <CalendarDays size={18} />
                      </div>
                      <div className="flex w-full rounded-lg">
                        {`${getMonthName(currentMonth)} / ${currentYear}`}
                      </div>
                      <div>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </div>
                    </Calendar>
                  </div>
                </div>
                <div className="flex w-48">
                  <ComboboxCategories
                    groupId={group._id}
                    categories={categories}
                    onSelect={(value) => {
                      setFilterByCategoryId(
                        filterByCategoryId === value ? null : value
                      );
                    }}
                    className="flex h-10 w-48 items-center justify-between rounded-lg border border-border pl-4"
                  >
                    <span className="text-sm text-secondary-foreground/50">
                      Filtre por categoria
                    </span>
                  </ComboboxCategories>
                </div>

                <DrawerFooter />
              </div>
            </DrawerContent>
          </Drawer>
          <span className="text-sm">filtros</span>
        </div>
      </div>
    </div>
  );
}
const getMonthName = (month: number) => {
  const date = new Date(2025, month - 1, 1);
  const monthName = format(date, "MMMM", { locale: ptBR });

  return monthName.charAt(0).toLocaleUpperCase() + monthName.slice(1);
};
