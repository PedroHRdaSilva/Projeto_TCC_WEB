"use client";
import { addYears, eachYearOfInterval, subYears } from "date-fns";
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
  onSelect?: (date: string) => void;
}

export default function Calendar({
  onSelect,
  defaultValues,
  className,
  children,
}: CalendarProps) {
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
                  className="rounded p-2 text-sm font-medium text-secondary-foreground"
                  style={{
                    backgroundColor:
                      selectedMonth === index + 1 ? "#3B82F6" : "transparent",
                  }}
                  onClick={() => {
                    const normalizedMonth = index + 1;

                    setSelectedMonth(index);

                    if (onSelect) {
                      onSelect(
                        `${year}-${normalizedMonth < 10 ? `0${normalizedMonth}` : normalizedMonth}-01`
                      );
                    }
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
