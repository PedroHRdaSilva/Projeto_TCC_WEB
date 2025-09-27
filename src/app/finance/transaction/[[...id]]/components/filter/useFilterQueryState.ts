import { parseAsDate } from "@/app/finance/transaction/[[...id]]/components/filter/urlParsers";
import { startOfMonth } from "date-fns/startOfMonth";
import { parseAsString, useQueryState } from "nuqs";

export default function useFilterQueryState() {
  const date = startOfMonth(new Date());

  const [filterByPeriod, setFilterByPeriod] = useQueryState(
    "period",
    parseAsDate.withDefault(date)
  );
  const [filterByCategoryId, setFilterByCategoryId] = useQueryState(
    "categoryId",
    parseAsString
  );
  const [filterBySearch, setFilterBySearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  return {
    filterByPeriod,
    filterByCategoryId,
    filterBySearch,

    setFilterByPeriod,
    setFilterByCategoryId,
    setFilterBySearch,
  };
}
