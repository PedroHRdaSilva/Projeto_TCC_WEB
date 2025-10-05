"use client";

import { lightFormat } from "date-fns";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { parseISO } from "date-fns/parseISO";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { useMonthlyRevenueVsExpensesQuery } from "@/graphql/hooks/graphqlHooks";
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

const chartConfig = {
  revenue: {
    label: "Receitas",
    color: "var(--chart-2)",
  },
  expense: {
    label: "Gasto",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface MonthlyRevenueVsExpensesChartProps {
  groupId: string;
  filterByStartMonth?: Date | null;
  filterByEndMonth?: Date | null;
}

export function MonthlyRevenueVsExpensesChart({
  groupId,
  filterByStartMonth,
  filterByEndMonth,
}: MonthlyRevenueVsExpensesChartProps) {
  const { data } = useMonthlyRevenueVsExpensesQuery({
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

  const chartData =
    data?.monthlyRevenueVsExpenses.map((item) => {
      return {
        time: parseISO(item.reportDate).getTime(),
        revenue: item.revenue,
        expense: item.expense,
      };
    }) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Receitas x Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            barSize={40}
            barGap={10}
            stackOffset="sign"
          >
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
            <ChartLegend content={<ChartLegendContent />} />

            <Bar
              dataKey="revenue"
              fill="var(--chart-green-light)"
              radius={[4, 4, 0, 0]}
              stroke="var(--chart-green-dark)"
              strokeWidth={2}
            />
            <Bar
              dataKey="expense"
              fill="var(--chart-9)"
              radius={[4, 4, 0, 0]}
              stroke="var(--chart-8)"
              strokeWidth={2}
            />
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
