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

  const rows = data?.monthlyRevenueVsExpenses ?? [];

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Receitas x Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-6">
            Carregando dados...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!rows.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Receitas x Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-6">
            Nenhum dado disponível para o período selecionado.
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = rows.map((item) => ({
    time: parseISO(item.reportDate).getTime(),
    revenue: item.revenue,
    expense: item.expense,
  }));

  const chartConfig: ChartConfig = {
    revenue: {
      label: "Receitas",
      color: "var(--chart-2)",
    },
    expense: {
      label: "Gastos",
      color: "var(--chart-1)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Receitas x Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} barSize={40} barGap={10}>
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

            <Bar
              dataKey="revenue"
              fill={chartConfig.revenue.color}
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="expense"
              fill={chartConfig.expense.color}
              radius={[8, 8, 0, 0]}
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
