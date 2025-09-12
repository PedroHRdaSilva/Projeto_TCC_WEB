"user client";

import type {
  IIconProperties,
  ITransactionGroupByIdQuery,
} from "@/graphql/types/graphqlTypes";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";

import { arrayOfPossibleIcons } from "@/lib/utils/utils";
import { Separator } from "@radix-ui/react-separator";

interface PopoverChangeIconProps {
  children: React.ReactNode;
  onChange: (iconProperties: Omit<IIconProperties, "__typename">) => void;
  iconProperties: Omit<
    NonNullable<
      ITransactionGroupByIdQuery["transactionGroupById"]
    >["iconProperties"],
    "__typename"
  >;
}
export function PopoverChangeIcon({
  children,
  onChange,
  iconProperties,
}: PopoverChangeIconProps) {
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild={true}>{children}</PopoverTrigger>

      <PopoverContent
        className="flex w-fit flex-col space-y-5 rounded-lg p-4"
        align="start"
        sideOffset={10}
      >
        <h4 className="font-medium leading-none text-muted-foreground">
          Escolha o Ícone
        </h4>

        <div className="grid grid-cols-6 gap-5">
          {colors.map((node) => (
            <div key={node} className="h-5 w-5">
              <button
                type="button"
                style={{ backgroundColor: node }}
                className="h-5 w-5 rounded-full"
                onClick={() =>
                  onChange({ ...iconProperties, background: node, color: node })
                }
              />
            </div>
          ))}
        </div>

        <Separator className="border-t border-border" />

        <div className="grid grid-cols-6 gap-5">
          {arrayOfPossibleIcons.map((node) => {
            const Icon = node;
            return (
              <div
                key={node.displayName}
                className="mt-2 flex items-center justify-center rounded-lg"
              >
                <button
                  type="button"
                  className="text-muted-foreground"
                  onClick={() =>
                    onChange({
                      ...iconProperties,
                      icon: node.displayName || "Thropy",
                    })
                  }
                >
                  <Icon size={20} />
                </button>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

const colors = [
  "#475569",
  "#57534e",
  "#dc2626",
  "#ea580c",
  "#facc15",
  "#16a34a",
  "#0d9488",
  "#0284c7",
  "#2563eb",
  "#7c3aed",
  "#c026d3",
  "#db2777",
];
