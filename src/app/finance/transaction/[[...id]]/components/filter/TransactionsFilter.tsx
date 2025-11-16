"use client";

import Calendar from "@/lib/ui/calendar";
import { Input } from "@/lib/ui/input";
import { cn } from "@/lib/utils/utils";
import { CalendarDays, ChevronDown, Search } from "lucide-react";
import { getMonth } from "date-fns/getMonth";
import { getYear } from "date-fns/getYear";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { parseISO } from "date-fns/parseISO";
import { startOfMonth } from "date-fns/startOfMonth";
import debounce from "lodash/fp/debounce";

import { parseAsDate } from "@/app/finance/transaction/[[...id]]/components/filter/urlParsers";
import { parseAsString, useQueryState } from "nuqs";
import ComboboxCategories from "@/app/finance/transaction/[[...id]]/components/filter/ComboboxCategories";
import { ICategoriesByGroupIdQuery } from "@/graphql/types/graphqlTypes";
import useFilterQueryState from "@/app/finance/transaction/[[...id]]/components/filter/useFilterQueryState";

interface TransactionsFilterProps {
  groupId: string;
  categories: ICategoriesByGroupIdQuery["categoriesByGroupId"];
}
export default function TransactionsFilter({
  groupId,
  categories,
}: TransactionsFilterProps) {
  const {
    filterByCategoryId,
    filterByPeriod,
    setFilterByCategoryId,
    setFilterByPeriod,
    setFilterBySearch,
  } = useFilterQueryState();

  const currentMonth = getMonth(filterByPeriod) + 1;
  const currentYear = getYear(filterByPeriod);
  return (
    <div className="flex w-full align-center space-x-5">
      <h1 className="text-2xl 2xl:text-3xl">Filtros</h1>
      <div className="flex space-x-5">
        <Calendar
          onSelect={(value) => {
            setFilterByPeriod(parseISO(value));
          }}
          defaultValues={{ month: currentMonth, year: currentYear }}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg whitespace-nowrap bg-white px-4 text-sm h-10",
            "xl:bg-white xl:h-10 xl:w-[228px]"
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
      <div className="flex w-full gap-2">
        <ComboboxCategories
          groupId={groupId}
          categories={categories}
          onSelect={(value) => {
            setFilterByCategoryId(filterByCategoryId === value ? null : value);
          }}
          className="flex h-10 w-60 items-center justify-between rounded-lg bg-white pl-4"
        >
          <span className="text-sm text-zinc-500">Filtre por categoria</span>
        </ComboboxCategories>

        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
            size={18}
          />
          <Input
            type="text"
            placeholder="Busque aqui..."
            className={cn(
              "pl-10 h-9 w-auto bg-background opacity-70 placeholder:text-zinc-500",
              "xl:bg-white xl:opacity-100 xl:h-10 xl:w-48 ",
              " 2xl:w-72 "
            )}
            onChange={debounce(400, (e) => {
              setFilterBySearch(e.target.value);
            })}
          />
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
