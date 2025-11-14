import { lightFormat } from "date-fns";
import React, { useState } from "react";
import { ResponsiveContainer, Tooltip, Treemap } from "recharts";

import { useMonthlySpendingByCategoryQuery } from "@/graphql/hooks/graphqlHooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";

import { formatCurrency } from "@/lib/utils/formatters";
import { Skeleton } from "@/lib/ui/skeleton";

interface TreemapCategorysChartProps {
  groupId: string;
  filterByStartMonth?: Date | null;
  filterByEndMonth?: Date | null;
}
type treemapDataTransaction = { name: string; size: number };
export default function TreemapCategorysChart({
  groupId,
  filterByStartMonth,
  filterByEndMonth,
}: TreemapCategorysChartProps) {
  const [isTransactionView, setIsTransactionView] = useState(false);
  const [treemapDataTransaction, setTreemapDataTransaction] = useState<
    treemapDataTransaction[]
  >([]);

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
  const chartData = rows.reduce<Record<string, number>>((acc, item) => {
    acc[item.category.description] =
      (acc[item.category.description] || 0) + item.amount;
    return acc;
  }, {});

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
            Crie uma categoria para começar a usar o grafico
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  const treemapData = Object.entries(chartData).map(([name, size]) => ({
    name,
    size,
  }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (node: any) => {
    if (!isTransactionView) {
      const transactions = rows.filter(
        (nodeItem) => nodeItem.category.description === node.name
      );
      if (transactions.length > 0) {
        const data = transactions.flatMap(
          (transaction) =>
            transaction.transactions?.map((t) => ({
              name: t.description,
              size: t.amount,
            })) || []
        );
        setTreemapDataTransaction(data);
        setIsTransactionView(true);
      }
    } else {
      setIsTransactionView(false);
      setTreemapDataTransaction([]);
    }
  };
  return (
    <Card className="xl:h-[316px]">
      <CardHeader>
        <CardTitle className="font-sans text-lg">
          Gastos por categoria
        </CardTitle>
        <CardDescription className="font-sans text-sm text-zinc-400">
          Distribuição dos gastos ao longo do período
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-2 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={isTransactionView ? treemapDataTransaction : treemapData}
            dataKey="size"
            aspectRatio={4 / 3}
            content={<CustomTreemapCell onClick={handleClick} />}
            isAnimationActive={false}
            stroke="none"
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTreemapCell({ x, y, width, height, name, size, onClick }: any) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{ fill: "#7F1D1D", stroke: "#fff", cursor: "pointer" }}
        onClick={() => onClick({ name, size })}
      />
      {width > 60 && height > 20 && (
        <>
          <text
            x={x + 5}
            y={y + 16}
            fill="#fff"
            fontSize={12}
            pointerEvents="none"
          >
            {name}
          </text>
          <text
            x={x + 5}
            y={y + 32}
            fill="#fff"
            fontSize={11}
            pointerEvents="none"
          >
            ({formatCurrency(size as number)})
          </text>
        </>
      )}
    </g>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="flex flex-col space-y-3 rounded bg-secondary p-3 text-sm shadow-md">
      <p className="font-dm-sans text-sm">{data.name}</p>
      <p className="font-dm-sans text-xs">{formatCurrency(data.size)}</p>
    </div>
  );
}
