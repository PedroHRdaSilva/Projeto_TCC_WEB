"use client";

import { lightFormat } from "date-fns";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { parseISO } from "date-fns/parseISO";
import { groupBy } from "lodash";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import { useMonthlySpendingByCategoryQuery } from "@/graphql/hooks/graphqlHooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";
import { ChartContainer, ChartTooltip } from "@/lib/ui/Chart";
import type { ChartConfig } from "@/lib/ui/Chart";

import type { TooltipContentProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { compactFormatter, formatCurrency } from "@/lib/utils/formatters";
import { Skeleton } from "@/lib/ui/skeleton";

export const description = "A stacked bar chart with a legend";

interface MonthlySpendingByCategoryChartProps {
  groupId: string;
  filterByStartMonth?: Date | null;
  filterByEndMonth?: Date | null;
}

export function MonthlySpendingByCategoryChart({
  groupId,
  filterByStartMonth,
  filterByEndMonth,
}: MonthlySpendingByCategoryChartProps) {
  const { data, loading } = useMonthlySpendingByCategoryQuery({
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

  const rows = data?.monthlySpendingByCategory ?? [];

  const grouped = groupBy(rows, "reportDate");

  const chartData = Object.entries(grouped).map(([date, items]) => {
    const base: Record<string, number | string> = {
      time: parseISO(date).getTime(),
    };

    items.forEach((item) => {
      base[item.category.description] =
        ((base[item.category.description] as number) || 0) + item.amount;
    });

    return base;
  });

  const categories = rows.map((c) => c.category.description) ?? [];
  const uniqueCategories = Array.from(new Set(categories));

  const stackedTotals = chartData.map((entry) =>
    uniqueCategories.reduce(
      (sum, cat) => sum + ((entry[cat] as number) || 0),
      0
    )
  );

  const maxValue = Math.round(Math.max(...stackedTotals) / 1000) * 1000;
  const midValue = Math.round(maxValue / 2);

  const chartConfig: ChartConfig = uniqueCategories.reduce((acc, cat, idx) => {
    acc[cat] = {
      label: cat,
      color: `var(--chart-${(idx % 10) + 1})`,
    };
    return acc;
  }, {} as ChartConfig);

  if (loading) {
    return (
      <div>
        <div className="flex space-x-4">
          <Skeleton className="flex h-[316px] w-full bg-background"></Skeleton>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <Card className="flex h-[316px] items-center justify-center">
        <CardHeader>
          <CardTitle className="font-sans text-lg">Receitas x Gastos</CardTitle>
          <CardDescription className="font-sans text-sm text-zinc-400">
            Crie um cartão para começar a usar o gráfico
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  if (chartData.length === 0) {
    return (
      <Card className="flex h-[316px] items-center justify-center text-center">
        <CardHeader>
          <CardTitle className="font-sans text-lg">
            Gastos por categoria
          </CardTitle>
          <CardDescription className="font-sans text-sm text-zinc-400">
            Não há gastos no período.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Card className="xl:h-[360px]">
      <CardHeader>
        <CardTitle className="font-sans text-lg">
          Gastos por categoria
        </CardTitle>
        <CardDescription className="font-sans text-sm text-zinc-400">
          Distribuição dos gastos ao longo do período
        </CardDescription>
      </CardHeader>
      <CardContent className="xl:p-0 xl:pl-1 xl:pr-4">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={chartData} stackOffset="sign">
            <CartesianGrid horizontal={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(time) =>
                format(new Date(time), "MMM/yyyy", { locale: ptBR })
              }
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, maxValue]}
              ticks={[0, midValue, maxValue]}
              tickFormatter={(value) => compactFormatter.format(value)}
            />

            <ReferenceLine
              y={maxValue}
              stroke="gray"
              strokeDasharray="3 3"
              label={{
                value: maxValue.toLocaleString("pt-BR"),
                position: "right",
                fill: "gray",
                fontSize: 12,
              }}
            />

            <ReferenceLine
              y={midValue}
              stroke="gray"
              strokeDasharray="3 3"
              label={{
                value: midValue.toLocaleString("pt-BR"),
                position: "right",
                fill: "gray",
                fontSize: 12,
              }}
            />

            <ReferenceLine y={0} strokeDasharray="3 3" stroke="gray" />

            <ChartTooltip
              cursor={false}
              content={renderCustomTooltip(chartConfig)}
            />

            {uniqueCategories.map((cat) => {
              return (
                <Bar
                  key={cat}
                  dataKey={cat}
                  stackId="a"
                  fill={chartConfig[cat]?.color}
                  radius={[0, 0, 0, 0]}
                />
              );
            })}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
const renderCustomTooltip = (chartConfig: ChartConfig) => {
  function TooltipComponent(props: TooltipContentProps<ValueType, NameType>) {
    return <CustomTooltip {...props} chartConfig={chartConfig} />;
  }

  TooltipComponent.displayName = "CustomTooltip";

  return TooltipComponent;
};
interface CustomTooltipProps extends TooltipContentProps<ValueType, NameType> {
  chartConfig: ChartConfig;
}
function CustomTooltip({
  active,
  payload,
  label,
  chartConfig,
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const formattedLabel =
    typeof label === "number"
      ? format(new Date(label), "MMM/yyyy", { locale: ptBR }).replace(
          /^./,
          (c) => c.toUpperCase()
        )
      : label;

  return (
    <div className="flex flex-col rounded bg-secondary p-2 text-sm shadow-md">
      <p className="font-dm-sans text-lg">{formattedLabel}</p>
      {payload.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 pt-2 ">
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
