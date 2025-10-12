import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils/utils";

export default function IndeterminateCheckbox({
  indeterminate,
  checked,
  ...rest
}: {
  indeterminate?: boolean;
  checked?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      className={cn(
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs peer mt-2 size-4 shrink-0 border border-input outline-none transition-shadow focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:data-[state=checked]:bg-primary"
      )}
      type="checkbox"
      ref={ref}
      checked={checked}
      {...rest}
    />
  );
}
