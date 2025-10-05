"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import debounce from "lodash/fp/debounce";
import {
  ArrowRightLeftIcon,
  ChevronRightIcon,
  CircleCheckBig,
  EllipsisVerticalIcon,
  PlusIcon,
  Search,
  TrophyIcon,
} from "lucide-react";

import { useTransactionsGroupQuery } from "@/graphql/hooks/graphqlHooks";

import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/ui/tooltip";

import { arrayOfPossibleIcons, cn, hexToRgba } from "@/lib/utils/utils";
import DeleteGroupAlert from "@/app/finance/transaction/[[...id]]/components/group/DeleteGroupAlert";
import TransactionsGroupConfig from "@/app/finance/transaction/[[...id]]/components/group/TransactionsGroupConfig";

interface TransactionGroupSelectionProps {
  groupIdPage?: string;
  dashboard?: boolean;
}

export default function TransactionGroupSelection({
  groupIdPage,
  dashboard,
}: TransactionGroupSelectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<string | null>(null);

  const { data, previousData } = useTransactionsGroupQuery({
    variables: { search },
  });

  const router = useRouter();
  const pathname = usePathname();

  const transactionsGroup =
    data?.transactionsGroup ?? previousData?.transactionsGroup ?? [];

  function handleReplace(clearUrl: boolean) {
    if (!clearUrl && pathname.includes(groupIdPage || "")) {
      const newURL = pathname.substring(0, pathname.lastIndexOf("/"));
      router.replace(newURL);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setSearch("");
        setIsOpen(open);
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild={true}>
            <DialogTrigger
              data-testid="group-switcher-trigger"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground",
                "hover:bg-accent hover:text-foreground focus:outline-none"
              )}
            >
              <ArrowRightLeftIcon size={24} />
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="mt-6">Ver Grupos</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="w-full mt-4 space-y-1">
          {/* Cabeçalho textual */}
          <div>
            <DialogTitle className="text-2xl font-semibold text-foreground">
              Grupo de transações
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              Lista de grupo de transações
            </DialogDescription>
          </div>

          {/* Barra de busca e botão */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <div className="flex items-center w-full sm:w-auto gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Busque aqui..."
                  className="pl-10 pr-4"
                  onChange={debounce(400, (e) => setSearch(e.target.value))}
                />
              </div>
              {!dashboard && (
                <TransactionsGroupConfig>
                  <Button variant="outline" className="gap-2 whitespace-nowrap">
                    <PlusIcon size={16} className="text-gray-500" />
                    Novo Grupo
                  </Button>
                </TransactionsGroupConfig>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Lista de grupos */}
        <section className="mt-5 flex flex-col h-60 w-full space-y-3 overflow-y-auto">
          <TooltipProvider>
            {transactionsGroup.map((group) => {
              const IconComponent =
                arrayOfPossibleIcons.find(
                  (node) => node.displayName === group.iconProperties.icon
                ) || TrophyIcon;

              return (
                <Link
                  key={group._id}
                  href={
                    dashboard
                      ? `/finance/dashboard/${group._id}`
                      : `/finance/transaction/${group._id}`
                  }
                  className="flex w-full items-center justify-between rounded-md hover:bg-muted/40 transition"
                >
                  {/* Ícone + Descrição */}
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: hexToRgba(
                          group.iconProperties.background,
                          1
                        ),
                      }}
                    >
                      <IconComponent
                        size={22}
                        style={{ color: group.iconProperties.color }}
                      />
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {group.description}
                    </p>
                  </div>

                  {/* Ações desktop */}
                  <div className="hidden lg:flex items-center rounded-lg border">
                    <Tooltip>
                      <TooltipTrigger
                        className="px-3.5 py-2"
                        onClick={(e) => e.preventDefault()}
                      >
                        <CircleCheckBig
                          size={18}
                          className="text-muted-foreground"
                        />
                      </TooltipTrigger>
                      <TooltipContent>Marcar como principal</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <DeleteGroupAlert
                            onDelete={(valor) => {
                              setIsOpen(valor);
                              handleReplace(valor);
                            }}
                            groupIdPage={groupIdPage}
                            groupId={group._id}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Excluir grupo</TooltipContent>
                    </Tooltip>

                    <Button
                      type="button"
                      variant="ghost"
                      className="px-3.5 py-2 hover:bg-transparent focus:outline-none"
                    >
                      <ChevronRightIcon size={20} />
                    </Button>
                  </div>

                  {/* Ações mobile */}
                  <Popover modal>
                    <PopoverTrigger className="flex lg:hidden">
                      <EllipsisVerticalIcon className="stroke-muted-foreground" />
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      sideOffset={10}
                      className="w-fit"
                    >
                      <ul className="space-y-2 text-sm text-foreground">
                        <li>
                          <Button
                            type="button"
                            variant="ghost"
                            // onClick={() =>
                            //   setDefaultTransactionGroup(group._id)
                            // }
                            className="p-1"
                          >
                            Definir como principal
                          </Button>
                        </li>
                        <li>
                          <DeleteGroupAlert
                            onDelete={(valor) => {
                              setIsOpen(valor);
                              handleReplace(valor);
                            }}
                            groupIdPage={groupIdPage}
                            groupId={group._id}
                            mobile={true}
                          />
                        </li>
                        <li>
                          <Link
                            href={
                              dashboard
                                ? `/finance/dashboard/${group._id}`
                                : `/finance/transaction/${group._id}`
                            }
                            className="p-1"
                          >
                            Ir para o grupo
                          </Link>
                        </li>
                      </ul>
                    </PopoverContent>
                  </Popover>
                </Link>
              );
            })}
          </TooltipProvider>
        </section>

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
