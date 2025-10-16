"use client";

import { lightFormat } from "date-fns";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { parseISO } from "date-fns/parseISO";
import { groupBy } from "lodash";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { useCardCategorySpendingQuery } from "@/graphql/hooks/graphqlHooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/lib/ui/Chart";
import type { ChartConfig, CustomTooltipProps } from "@/lib/ui/Chart";

import type { TooltipContentProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export const description = "A stacked bar chart with a legend";

interface MonthlySpendingByCategoryChartProps {
  groupId: string;
  filterByStartMonth?: Date | null;
  filterByEndMonth?: Date | null;
}

export function CardCategorySpending({
  groupId,
  filterByStartMonth,
  filterByEndMonth,
}: MonthlySpendingByCategoryChartProps) {
  const { data } = useCardCategorySpendingQuery({
    variables: {
      groupId: groupId,
      filterByStartMonth: filterByStartMonth
        ? lightFormat(filterByStartMonth, "yyyy-MM-dd")
        : undefined,
      filterByEndMonth: filterByEndMonth
        ? lightFormat(filterByEndMonth, "yyyy-MM-dd")
        : undefined,
    },
  });

  const rows = data?.cardCategorySpending ?? [];

  const grouped = groupBy(rows, "reportDate");

  const chartData = Object.entries(grouped).map(([date, items]) => {
    const base: Record<string, number | string> = {
      time: parseISO(date).getTime(),
    };

    items.forEach((item) => {
      const key = item.category.description;
      base[key] = ((base[key] as number) || 0) + item.amount;
    });

    return base;
  });

  const categories = rows.map((c) => c.category.description) ?? [];
  const uniqueCategories = Array.from(new Set(categories));

  const chartConfig: ChartConfig = rows.reduce((acc, item, idx) => {
    const key = item.category.description;
    acc[key] = {
      label: item.creditCard.description,
      color: `var(--chart-${(idx % 10) + 1})`,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Gastos do Cartão por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} barSize={200} stackOffset="sign">
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(time) =>
                format(new Date(time), "MMM/yyyy", { locale: ptBR })
              }
            />

            <ChartTooltip content={CustomTooltip} />

            {uniqueCategories.map((cat, idx) => {
              const isLast = idx === uniqueCategories.length - 1;
              return (
                <Bar
                  key={cat}
                  dataKey={cat}
                  stackId="a"
                  fill={chartConfig[cat]?.color}
                  radius={isLast ? [8, 8, 0, 0] : [0, 0, 0, 0]}
                />
              );
            })}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
function CustomTooltip(props: TooltipContentProps<ValueType, NameType>) {
  return (
    <ChartTooltipContent {...(props as CustomTooltipProps)} hideLabel={true} />
  );
}
