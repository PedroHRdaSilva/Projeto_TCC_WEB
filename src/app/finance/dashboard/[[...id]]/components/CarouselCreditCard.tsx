import { getMonth, getYear, lightFormat, parseISO } from "date-fns";
import { CalendarDays, ChevronDown, Cpu, Wifi } from "lucide-react";
import * as React from "react";
import { format } from "date-fns/format";
import {
  useCreditCardByGroupIdQuery,
  useTransactionsByGroupIdQuery,
} from "@/graphql/hooks/graphqlHooks";
import type { ITransactionsByGroupIdQuery } from "@/graphql/types/graphqlTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";

import { formatCurrency } from "@/lib/utils/formatters";
import useFilterQueryState from "@/app/finance/transaction/[[...id]]/components/filter/useFilterQueryState";
import { Skeleton } from "@/lib/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  useCarousel,
} from "@/lib/ui/carousel";
import Calendar from "@/lib/ui/calendar";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";

type TransactionNode = NonNullable<
  ITransactionsByGroupIdQuery["transactions"]["nodes"]
>[number];

interface CarouselCreditCardProps {
  groupId: string;
}

export default function CarouselCreditCard({
  groupId,
}: CarouselCreditCardProps) {
  const {
    filterByCategoryId,
    filterBySearch,
    filterByPeriod,
    setFilterByPeriod,
  } = useFilterQueryState();

  const { data, loading: creditCardLoading } = useCreditCardByGroupIdQuery({
    variables: {
      transactionGroupId: groupId,
    },
  });

  const { data: transactions, loading } = useTransactionsByGroupIdQuery({
    variables: {
      cursor: null,
      filterByCategoryId,
      filterByPeriod: lightFormat(
        filterByPeriod ? filterByPeriod : new Date(),
        "yyyy-MM-dd"
      ),
      filterBySearch,
      groupId,
      limit: 30,
    },
  });
  const currentMonth = getMonth(filterByPeriod) + 1;
  const currentYear = getYear(filterByPeriod);
  if (creditCardLoading || loading) {
    return (
      <div>
        <div className="flex space-x-4">
          <Skeleton className="flex h-96 md:w-[455px] xl:w-[385px] bg-background w-full"></Skeleton>
        </div>
      </div>
    );
  }
  if (
    transactions?.transactions.nodes.length === 0 ||
    data?.creditCardByGroupId.length === 0
  ) {
    return (
      <Card className="flex h-[370px] md:w-[455px] xl:w-[472px] w-full">
        <CardHeader className="h-full">
          <CardTitle className="flex flex-col font-sans text-lg space-y-3 md:flex-row md:items-center justify-between">
            <span className="p-1">Cartões de crédito</span>

            <Calendar
              onSelect={(value) => {
                setFilterByPeriod(parseISO(value));
              }}
              defaultValues={{ month: currentMonth, year: currentYear }}
              className={cn(
                "flex  items-center gap-3 rounded-lg whitespace-nowrap bg-zinc-100 px-4 text-sm h-10 w-[240px]  md:w-[230px]",
                " xl:h-10 xl:w-[228px]"
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
            </Calendar>
          </CardTitle>
          <CardDescription className="font-sans text-sm text-zinc-400 items-center justify-center flex text-center ">
            Crie um cartão de crédito ou cria uma transação nesse periodo com
            algum cartao já criado.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:w-[455px] xl:w-full">
      <CardTitle className="flex flex-col font-sans text-lg space-y-3 md:flex-row md:items-center justify-between">
        <span className="p-1">Cartões de crédito</span>

        <Calendar
          onSelect={(value) => {
            setFilterByPeriod(parseISO(value));
          }}
          defaultValues={{ month: currentMonth, year: currentYear }}
          className={cn(
            "flex  items-center gap-3 rounded-lg whitespace-nowrap bg-zinc-100 px-4 text-sm h-10 w-[240px]  md:w-[230px]",
            " xl:h-10 xl:w-[228px]"
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
        </Calendar>
      </CardTitle>
      <Carousel>
        <CarouselContent>
          {data?.creditCardByGroupId.map((card, index) => (
            <CarouselItem key={card._id ?? index}>
              <CardContent className="flex flex-col p-0">
                <div className="flex h-28 flex-col justify-between rounded-md border p-3 bg-black/30">
                  <div className="flex space-x-2">
                    <Cpu size={16} />
                    <Wifi size={16} className="rotate-90" />
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="font-sans text-sm">
                      {card.description}
                    </span>
                    <span className="font-sans text-sm">{card.validity}</span>
                  </div>
                </div>
              </CardContent>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="mt-4" />
        <CarouselDetails
          cards={data?.creditCardByGroupId ?? []}
          transactions={transactions?.transactions.nodes ?? []}
        />
      </Carousel>
    </Card>
  );
}

function CarouselDetails({
  cards,
  transactions,
}: {
  cards: { _id: string; limit?: number }[];
  transactions: TransactionNode[];
}) {
  const { selectedIndex } = useCarousel();
  const selectedCard = cards[selectedIndex];

  const transactionsForCard =
    selectedCard?._id != null
      ? transactions.filter((node) => node.creditCard?._id === selectedCard._id)
      : [];

  const totalSpent = transactionsForCard.reduce(
    (sum, node) => sum + (node.amount ?? 0),
    0
  );
  const limit = selectedCard?.limit ?? 0;
  const percent = limit > 0 ? (totalSpent / limit) * 100 : 0;

  return (
    <div className="mt-7 flex flex-col">
      <span className="mb-3 font-sans text-sm">Limite de gasto do cartão</span>
      <div className="mb-4 flex justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-sans text-sm text-secondary-foreground">
            {formatCurrency(totalSpent)}
          </span>
          <span className="font-sans text-xs">usado</span>
        </div>
        <span className="font-sans text-sm">{formatCurrency(limit)}</span>
      </div>
      <div className="h-3 w-full rounded-md border bg-background">
        <div
          className="h-[11px] rounded-md bg-black transition-all duration-300"
          style={{ width: `${percent > 100 ? 100 : percent}%` }}
        />
      </div>
    </div>
  );
}
const getMonthName = (month: number) => {
  const date = new Date(2025, month - 1, 1);
  const monthName = format(date, "MMMM", { locale: ptBR });

  return monthName.charAt(0).toLocaleUpperCase() + monthName.slice(1);
};
