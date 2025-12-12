"use client";

import { lightFormat } from "date-fns";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { parseISO } from "date-fns/parseISO";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { useMonthlyRevenueVsExpensesQuery } from "@/graphql/hooks/graphqlHooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/lib/ui/Chart";

import type { TooltipContentProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { Skeleton } from "@/lib/ui/skeleton";
import { compactFormatter, formatCurrency } from "@/lib/utils/formatters";

export const description = "A simple bar chart with grouped bars";
const chartConfig = {
  revenue: {
    label: "Receitas",
    color: "var(--chart-2)",
  },
  expense: {
    label: "Gastos",
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
  const { data, loading } = useMonthlyRevenueVsExpensesQuery({
    variables: {
      groupId,
      filterByStartMonth: filterByStartMonth
        ? lightFormat(filterByStartMonth, "yyyy-MM-dd")
        : undefined,
      filterByEndMonth: filterByEndMonth
        ? lightFormat(filterByEndMonth, "yyyy-MM-dd")
        : undefined,
    },
  });

  const chartData =
    data?.monthlyRevenueVsExpenses.map((item) => ({
      time: format(parseISO(item.reportDate), "MMM/yyyy", { locale: ptBR }),
      revenue: item.revenue,
      expense: item.expense,
    })) ?? [];

  if (loading) {
    return (
      <div>
        <div className="flex space-x-4">
          <Skeleton className="flex h-[385px] w-full bg-background"></Skeleton>
        </div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className="flex h-[350px] items-center justify-center text-center">
        <CardHeader>
          <CardTitle className="font-sans text-lg">Receitas x Gastos</CardTitle>
          <CardDescription className="font-sans text-sm text-zinc-400">
            Não há movimentações no período .
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="flex h-[316px] items-center justify-center">
        <CardHeader>
          <CardTitle className="font-sans text-lg">Receitas x Gastos</CardTitle>
          <CardDescription className="font-sans text-sm text-zinc-400">
            Não há movimentações no período .
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-sans text-lg">Receitas x Gastos</CardTitle>
        <CardDescription className="font-sans text-sm text-zinc-400">
          Fluxo de caixa ao longo do período
        </CardDescription>
      </CardHeader>

      <CardContent className="xl:p-0 xl:pl-1 xl:pr-4">
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid horizontal={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                compactFormatter.format(Math.abs(value))
              }
            />

            <ChartTooltip cursor={false} content={CustomTooltip} />

            {/* Agora barras lado a lado */}
            <Bar
              dataKey="revenue"
              fill="var(--chart-green-dark)"
              stroke="var(--chart-green-dark)"
              strokeWidth={2}
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="expense"
              fill="var(--chart-5)"
              stroke="var(--chart-5)"
              strokeWidth={2}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload || payload.length === 0) return null;

  const formattedLabel = label
    ?.toString()
    .replace(/^./, (c) => c.toUpperCase());

  return (
    <div className="flex flex-col rounded bg-secondary p-2 text-lg shadow-md">
      <p className="font-dm-sans text-lg">{formattedLabel}</p>
      {payload.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 pt-2 text-lg">
          <span
            className="h-2 w-2 rounded-sm"
            style={{ backgroundColor: item.color }}
          ></span>

          <div className="flex w-full justify-between space-x-3">
            <span className="font-dm-sans  text-muted-foreground">
              {chartConfig[item.dataKey as keyof typeof chartConfig]?.label}:
            </span>
            <span className="font-dm-sans  text-muted-foreground">
              {formatCurrency(item.value as number)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
