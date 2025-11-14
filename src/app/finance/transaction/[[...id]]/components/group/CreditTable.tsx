"use client";

import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast as toastSonner } from "sonner";
import { useCreditCardByGroupIdQuery } from "@/graphql/hooks/graphqlHooks";
import type { ICreditCardByGroupIdQuery } from "@/graphql/types/graphqlTypes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/lib/ui/alertDialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";

import { DataTable, DataTableSkeleton } from "@/lib/ui/table/DataTable";

import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/lib/ui/skeleton";
import GroupCreditForm from "@/app/finance/transaction/[[...id]]/components/group/GroupCreditForm";
import useCreditActions from "@/app/finance/transaction/[[...id]]/components/hooks/useCreditActions";
import { toast } from "sonner";

type CreditTable = ICreditCardByGroupIdQuery["creditCardByGroupId"][0];

interface GroupCreditTableTableProps {
  groupId: string;
}

export default function CreditTable({ groupId }: GroupCreditTableTableProps) {
  const { data, loading } = useCreditCardByGroupIdQuery({
    variables: {
      transactionGroupId: groupId,
    },
  });

  const columns: ColumnDef<CreditTable>[] = [
    {
      accessorKey: "description",
      header: "Cartão",
      cell: DeleteDescriptionRender,
    },
    {
      id: "actions",
      header: () => <span className="flex w-full justify-end">Ações</span>,
      cell: (cell) => DeleteActionsRender(cell, groupId),
      size: 100,
      maxSize: 100,
    },
  ];

  if (loading) {
    return (
      <DataTableSkeleton
        columns={columns}
        rows={6}
        onMobileRender={MobileSkeleton}
      />
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data ? [...data.creditCardByGroupId] : []}
      onMobileRender={(row) => GroupCategoryTableMobileRender(row, groupId)}
    />
  );
}

function GroupCategoryTableMobileRender(row: CreditTable, groupId: string) {
  const { refresh } = useRouter();
  const { deleteCredit } = useCreditActions();

  return (
    <div className="flex w-full items-center justify-between">
      <span>{row.description}</span>

      <Popover modal={true}>
        <PopoverTrigger className="flex lg:hidden">
          <EllipsisVerticalIcon className="stroke-muted-foreground" />
        </PopoverTrigger>

        <PopoverContent align="end" sideOffset={10} className="w-fit">
          <ul className="space-y-2 text-sm text-foreground">
            {/* EDITAR */}
            <li>
              <GroupCreditForm
                groupId={groupId}
                initialValues={row}
                className="flex items-center gap-2"
              >
                <span className="flex items-center gap-2">
                  <PencilIcon size={16} className="stroke-1" />
                  Editar
                </span>
              </GroupCreditForm>
            </li>

            {/* EXCLUIR */}
            <li>
              <AlertDialog>
                <AlertDialogTrigger className="flex items-center gap-2">
                  <Trash2Icon size={16} className="stroke-1" />
                  Excluir
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Deseja mesmo excluir este cartão?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação é irreversível e só será permitida caso não
                      existam transações vinculadas a este cartão.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        toastSonner.promise(
                          deleteCredit({
                            variables: { id: row._id },
                          }),
                          {
                            position: "top-center",
                            loading: "Deletando Cartao...",
                            success: "Cartao deletado com sucesso!",
                            error:
                              "Erro ao deletar o cartao,cartao esta vinculado a uma transação.",
                          }
                        );
                        refresh();
                      }}
                    >
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function DeleteDescriptionRender(cell: CellContext<CreditTable, unknown>) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-foreground">{cell.getValue() as string}</p>
    </div>
  );
}

function DeleteActionsRender(
  cell: CellContext<CreditTable, unknown>,
  groupId: string
) {
  const { refresh } = useRouter();
  const { deleteCredit } = useCreditActions();

  return (
    <div className="flex items-center justify-end space-x-2">
      {/* EXCLUIR */}
      <AlertDialog>
        <AlertDialogTrigger className="text-muted-foreground hover:text-foreground">
          <Trash2Icon size={20} className="stroke-1" />
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja mesmo excluir este cartão?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação é irreversível e só será permitida caso não existam
              transações vinculadas a esta cartão.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                toastSonner.promise(
                  deleteCredit({
                    variables: { id: cell.row.original._id },
                  }),
                  {
                    position: "top-center",
                    loading: "Deletando Cartao...",
                    success: "Cartao deletado com sucesso!",
                    error:
                      "Erro ao deletar o cartao,cartao esta vinculado a uma transação.",
                  }
                );
                refresh();
              }}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* EDITAR */}
      <GroupCreditForm
        groupId={groupId}
        className="text-muted-foreground hover:text-foreground"
        initialValues={cell.row.original}
      >
        <PencilIcon size={20} className="stroke-1" />
      </GroupCreditForm>
    </div>
  );
}

function MobileSkeleton() {
  return (
    <div className="flex flex-col space-y-1">
      <Skeleton className="h-4 w-32 bg-secondary" />
    </div>
  );
}
