export default function parseCurrencyToNumber(input: string): number {
  if (!input) return 0;

  const clean = input
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const num = Number(clean);

  return isNaN(num) ? 0 : num;
}
