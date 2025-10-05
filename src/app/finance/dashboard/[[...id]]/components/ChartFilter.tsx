"use client";

import { getMonth, getYear, startOfMonth } from "date-fns";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { parseISO } from "date-fns/parseISO";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/lib/ui/button";
import CalendarRangePiker from "@/lib/ui/calendarRangePiker";
import { cn } from "@/lib/utils/utils";
import { parseAsDate } from "@/app/finance/transaction/[[...id]]/components/filter/urlParsers";

export default function ChartFilter() {
  const date = startOfMonth(new Date());
  const [filterByStartMonth, setFilterByStarMonth] = useQueryState(
    "start",
    parseAsDate.withDefault(date)
  );
  const [filterByEndMonth, setFilterByEndMonth] = useQueryState(
    "end",
    parseAsDate.withDefault(date)
  );
  const currentMonth = getMonth(filterByStartMonth) + 1;
  const currentYear = getYear(filterByStartMonth);
  return (
    <div>
      <div className="">
        <div className="mb-2 flex flex-grow items-center space-x-3 xl:w-60 xl:flex-grow-0">
          <CalendarRangePiker
            onSelectStart={(value) => {
              setFilterByStarMonth(parseISO(value));
            }}
            onSelectEnd={(value) => {
              setFilterByEndMonth(parseISO(value));
            }}
            defaultValues={{ month: currentMonth, year: currentYear }}
            className={cn(
              "flex w-full items-center gap-3 whitespace-nowrap rounded-lg bg-background p-3 text-sm opacity-70",
              "xl:p-3 xl:opacity-100"
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
          </CalendarRangePiker>
          <div>
            <Button
              variant="secondary"
              className="bg-background p-3 hover:bg-background"
              type="button"
              onClick={() => {
                setFilterByEndMonth(null);
                setFilterByStarMonth(null);
              }}
            >
              Resetar Data
            </Button>
          </div>
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
