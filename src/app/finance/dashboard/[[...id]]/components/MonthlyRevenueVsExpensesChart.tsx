"use client";

import { lightFormat } from "date-fns";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { parseISO } from "date-fns/parseISO";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

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
    data?.monthlyRevenueVsExpenses.map((item) => {
      return {
        time: format(parseISO(item.reportDate), "MMM/yyyy", { locale: ptBR }),
        revenue: item.revenue,
        expense: item.expense * -1,
      };
    }) ?? [];

  const allValues = chartData.flatMap((d) => [d.revenue, d.expense]);
  const maxAbsolute = allValues.reduce((acc, val) => {
    return Math.abs(val) > Math.abs(acc) ? val : acc;
  }, 0);

  if (loading) {
    return (
      <div>
        <div className="flex space-x-4">
          <Skeleton className="flex h-[316px] w-full bg-background"></Skeleton>
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
          <BarChart data={chartData} stackOffset="sign">
            <CartesianGrid horizontal={false} />
            <XAxis
              dataKey="time"
              type="category"
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

            <ReferenceLine
              y={maxAbsolute}
              stroke="gray"
              strokeDasharray="3 3"
            />
            <ReferenceLine y={0} stroke="gray" strokeDasharray="3 3" />
            <ReferenceLine
              y={maxAbsolute * -1}
              stroke="gray"
              strokeDasharray="3 3"
            />
            <ChartTooltip cursor={false} content={CustomTooltip} />

            <Bar
              dataKey="revenue"
              fill="var(--chart-green-dark)"
              radius={[4, 4, 0, 0]}
              stroke="var(--chart-green-dark)"
              strokeWidth={2}
              stackId="stack1"
            />

            <Bar
              dataKey="expense"
              fill="var(--chart-5)"
              radius={[4, 4, 0, 0]}
              stroke="var(--chart-5)"
              strokeWidth={2}
              stackId="stack1"
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
    <div className="flex flex-col rounded bg-secondary p-2 text-sm shadow-md">
      <p className="font-dm-sans text-[10px]">{formattedLabel}</p>
      {payload.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 pt-2 text-xs">
          <span
            className="h-2 w-2 rounded-sm"
            style={{ backgroundColor: item.color }}
          ></span>
          <div className="flex w-full justify-between space-x-3">
            <span className="font-dm-sans text-[9px] text-muted-foreground">
              {chartConfig[item.dataKey as keyof typeof chartConfig]?.label}:
            </span>
            <span className="font-dm-sans text-[9px] text-muted-foreground">
              {formatCurrency(Math.abs(item.value as number))}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
