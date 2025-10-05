"use client";
import { addYears, eachYearOfInterval, subYears } from "date-fns";
import { isSameMonth, isAfter, isBefore } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";

const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

interface CalendarProps {
  defaultValues: { month: number; year: number } | null;
  className?: string;
  children: React.ReactNode;
  onSelectStart?: (date: string) => void;
  onSelectEnd?: (date: string) => void;
}

export default function CalendarRangePiker({
  onSelectStart,
  onSelectEnd,
  defaultValues,
  className,
  children,
}: CalendarProps) {
  const [range, setRange] = useState<{
    start: string | null;
    end: string | null;
  }>({
    start: null,
    end: null,
  });
  const minYear = subYears(
    defaultValues
      ? `01/${defaultValues.month}/${defaultValues.year}`
      : new Date(),
    5
  );
  const maxYear = addYears(
    defaultValues
      ? `01/${defaultValues.month}/${defaultValues.year}`
      : new Date(),
    6
  );

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    new Date().getMonth()
  );
  const [selectingYear, setSelectingYear] = useState(false);

  useEffect(() => {
    if (defaultValues) {
      setYear(defaultValues.year);
      setSelectedMonth(defaultValues.month);
    }
  }, [defaultValues]);
  const handleSelectMonth = (monthIndex: number) => {
    const normalizedMonth = monthIndex + 1;
    const date = `${year}-${normalizedMonth < 10 ? `0${normalizedMonth}` : normalizedMonth}-01`;

    if (!range.start) {
      setRange({ start: date, end: null });
      onSelectStart?.(date);
    } else if (!range.end) {
      let startDate = range.start;
      let endDate = date;

      if (new Date(startDate) > new Date(endDate)) {
        [startDate, endDate] = [endDate, startDate];
      }

      setRange({ start: startDate, end: endDate });

      onSelectStart?.(startDate);
      onSelectEnd?.(endDate);
    } else {
      setRange({ start: date, end: null });
      onSelectStart?.(date);
      onSelectEnd?.(date);
    }
  };
  return (
    <Popover modal={true}>
      <PopoverTrigger className={className}>{children}</PopoverTrigger>
      <PopoverContent
        className="flex w-60 rounded-2xl p-0"
        align="start"
        sideOffset={10}
      >
        <div className="flex w-full flex-col rounded-xl bg-secondary p-4 text-center shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <button
              className="rounded p-1 text-secondary-foreground"
              onClick={() => setYear((prev) => prev - 1)}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="font-semibold text-secondary-foreground"
              onClick={() => setSelectingYear(true)}
            >
              {year}
            </button>
            <button
              className="rounded p-1 text-secondary-foreground"
              onClick={() => setYear((prev) => prev + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {selectingYear ? (
            <div className="grid grid-cols-3 gap-2">
              {eachYearOfInterval({ start: minYear, end: maxYear }).map(
                (node) => (
                  <button
                    key={node.toISOString()}
                    className="rounded p-2 text-sm font-medium text-secondary-foreground"
                    style={{
                      backgroundColor:
                        year === node.getFullYear() ? "#3B82F6" : "transparent",
                    }}
                    onClick={() => {
                      setYear(node.getFullYear());
                      setSelectingYear(false);
                    }}
                  >
                    {node.getFullYear()}
                  </button>
                )
              )}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => (
                <button
                  key={month}
                  onClick={() => handleSelectMonth(index)}
                  className="rounded p-2 text-sm font-medium text-secondary-foreground"
                  style={{
                    backgroundColor: getMonthBackground(year, index - 1, range),
                  }}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
function getMonthBackground(
  year: number,
  monthIndex: number,
  range: { start: string | null; end: string | null }
) {
  const monthDate = new Date(year, monthIndex, 1);

  if (range.start && !range.end) {
    const startDate = new Date(range.start);
    if (isSameMonth(monthDate, startDate)) {
      return "#3B82F6";
    }
    return "transparent";
  }

  if (range.start && range.end) {
    const startDate = new Date(range.start);
    const endDate = new Date(range.end);

    if (isSameMonth(monthDate, startDate) || isSameMonth(monthDate, endDate)) {
      return "#3B82F6";
    }

    if (isAfter(monthDate, startDate) && isBefore(monthDate, endDate)) {
      return "#93C5FD";
    }
  }

  return "transparent";
}
