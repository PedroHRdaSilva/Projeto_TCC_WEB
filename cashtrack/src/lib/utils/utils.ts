import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Params } from "next/dist/server/request/params";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getParamStringValue(
  params: Params,
  key: string,
  defaultValue?: string
) {
  const value = params[key];

  if (!value) {
    return defaultValue;
  }
  if (typeof value === "string") {
    return value;
  }
  if (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === "string"
  ) {
    return value[0];
  }
  return defaultValue;
}
