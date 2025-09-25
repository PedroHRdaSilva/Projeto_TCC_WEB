import * as React from "react";

import { cn } from "@/lib/utils/utils";

type InputType = React.HTMLInputTypeAttribute | "currency";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  currencyFormat?: Intl.NumberFormat;
  type?: InputType;
}

export const defaultCurrencyFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = "text", currencyFormat, onChange, onFocus, ...props },
    ref
  ) => {
    const isCurrency = type === "currency";
    const inputType = isCurrency ? "text" : type;

    const formatCurrency = (value: number) => {
      return (currencyFormat ?? defaultCurrencyFormat).format(value);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (isCurrency) {
        const target = e.currentTarget;
        target.setSelectionRange(target.value.length, target.value.length);
      }
      onFocus?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isCurrency) {
        const target = e.currentTarget;
        const numericValue = Number(target.value.replace(/\D/g, "")) / 100;
        target.value = formatCurrency(numericValue);
      }
      onChange?.(e);
    };

    return (
      <input
        type={inputType}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background",
          "px-3 py-2 text-sm ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400/20 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        maxLength={isCurrency ? 22 : undefined}
        onFocus={handleFocus}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
