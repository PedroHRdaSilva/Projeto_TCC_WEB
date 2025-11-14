export const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value);

export const compactFormatter = new Intl.NumberFormat("pt-BR", {
  notation: "compact",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});
