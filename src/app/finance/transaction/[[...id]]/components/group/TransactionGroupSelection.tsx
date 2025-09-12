"use client";
import DeleteGroupAlert from "@/app/finance/transaction/[[...id]]/components/group/DeleteGroupAlert";
import TransactionsGroupConfig from "@/app/finance/transaction/[[...id]]/components/group/TransactionsGroupConfig";
import { useTransactionsGroupQuery } from "@/graphql/hooks/graphqlHooks";
import { Button } from "@/lib/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/ui/dialog";
import { Input } from "@/lib/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/ui/tooltip";
import { arrayOfPossibleIcons, cn, hexToRgba } from "@/lib/utils/utils";
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
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import TransactionsGroupQuery from "@/graphql/queries/transactions/TransactionsGroupQuery";

interface TransactionGroupSelectionProps {
  groupIdPage?: string;
}

export default function TransactionGroupSelection({
  groupIdPage,
}: TransactionGroupSelectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<string | null>(null);
  const { data, previousData } = useTransactionsGroupQuery({
    variables: { search },
  });
  const router = useRouter();
  const pathname = usePathname();
  function handleReplace(clearUrl: boolean) {
    if (!clearUrl) {
      if (pathname.includes(groupIdPage || "")) {
        const newURL = pathname.substring(0, pathname.lastIndexOf("/"));

        router.replace(newURL);
      }
    }
  }
  const transactionsGroup =
    data?.transactionsGroup ?? previousData?.transactionsGroup ?? [];
  return (
    <div className="">
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setSearch("");
          }
          setIsOpen(open);
        }}
        open={isOpen}
      >
        <form>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="p-2.5 text-secondary-foreground"
            >
              <ArrowRightLeftIcon size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader className="flex flex-row items-center justify-between w-full mt-6">
              <div className="flex flex-col space-y-3">
                <DialogTitle className="text-2xl">
                  Grupo de transações
                </DialogTitle>
                <DialogDescription className="text-lg">
                  Lista de grupo de transações
                </DialogDescription>
              </div>
              <div className="relative w-72 ">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Busque aqui"
                  className="pl-10 pr-4"
                  onChange={debounce(400, (searchQuery) => {
                    setSearch(searchQuery.target.value);
                  })}
                />
              </div>
              <div className="relative ml-auto">
                <TransactionsGroupConfig
                  refetchQueries={[
                    {
                      query: TransactionsGroupQuery,
                      variables: { search: search },
                    },
                  ]}
                >
                  <Button variant="outline" className="gap-3">
                    <PlusIcon size={16} className="text-gray-500" />
                    Novo Grupo
                  </Button>
                </TransactionsGroupConfig>
              </div>
            </DialogHeader>
            <div className="mt-2 flex h-60 w-full flex-col space-y-4 overflow-y-auto">
              {transactionsGroup?.map((group) => {
                const IconComponent =
                  arrayOfPossibleIcons.find(
                    (node) => node.displayName === group.iconProperties.icon
                  ) || TrophyIcon;

                return (
                  <Link
                    key={group._id}
                    href={`/finance/transaction/${group._id}`}
                    className="flex w-full items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: hexToRgba(
                            group.iconProperties.background,
                            0.2
                          ),
                        }}
                      >
                        <IconComponent
                          size={24}
                          style={{ color: group.iconProperties.color }}
                        />
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-medium text-foreground">
                          {group.description}
                        </p>
                      </div>
                    </div>

                    <div
                      className={
                        "hidden items-center rounded-lg lg:flex border"
                      }
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            className="px-3.5 py-2"
                            onClick={(e) => {
                              e.preventDefault();
                              // setDefaultTransactionGroup(group._id);
                            }}
                          >
                            <CircleCheckBig
                              size={18}
                              className={cn("text-current", {
                                // "text-primary":
                                //   // defaultTransactionGroup === group._id,
                              })}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            Marque o grupo como principal
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild={true}>
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
                      </TooltipProvider>

                      <Button
                        type="button"
                        variant="ghost"
                        className="px-3.5 py-2 hover:bg-transparent focus:outline-none"
                      >
                        <ChevronRightIcon size={20} />
                      </Button>
                    </div>

                    <Popover modal={true}>
                      <PopoverTrigger className="flex lg:hidden">
                        <EllipsisVerticalIcon className="stroke-muted-foreground" />
                      </PopoverTrigger>

                      <PopoverContent
                        align="end"
                        sideOffset={10}
                        className="w-fit"
                      >
                        <ul className="space-y-2 text-sm text-foreground">
                          <li>Definir como principal</li>
                          <li>Excluir</li>
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </Link>
                );
              })}
            </div>
            <DialogFooter></DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
