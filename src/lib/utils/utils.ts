import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Params } from "next/dist/server/request/params";
import {
  CarIcon,
  ClipboardPenIcon,
  CrossIcon,
  FilePlus2Icon,
  GraduationCapIcon,
  HandCoinsIcon,
  HouseIcon,
  PawPrintIcon,
  PiggyBankIcon,
  PlaneTakeoffIcon,
  TreePalmIcon,
  TrophyIcon,
  UtensilsIcon,
} from "lucide-react";

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

export const arrayOfPossibleIcons = [
  HouseIcon,
  UtensilsIcon,
  CarIcon,
  CrossIcon,
  GraduationCapIcon,
  TreePalmIcon,
  FilePlus2Icon,
  ClipboardPenIcon,
  PawPrintIcon,
  PlaneTakeoffIcon,
  HandCoinsIcon,
  PiggyBankIcon,
  TrophyIcon,
];
export function hexToRgba(hex: string, opacity: number) {
  const sanitizedHex = hex.replace(/^#/, "");

  const r = parseInt(sanitizedHex.substring(0, 2), 16);
  const g = parseInt(sanitizedHex.substring(2, 4), 16);
  const b = parseInt(sanitizedHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
