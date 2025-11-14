"use client";

import {
  EllipsisVerticalIcon,
  PencilIcon,
  Trash2Icon,
  TrophyIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCategoriesByGroupIdQuery } from "@/graphql/hooks/graphqlHooks";
import {
  ITransactionCategoryTypeEnum,
  type ICategoriesByGroupIdQuery,
} from "@/graphql/types/graphqlTypes";
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
import { arrayOfPossibleIcons, hexToRgba } from "@/lib/utils/utils";

import type { CellContext, ColumnDef } from "@tanstack/react-table";
import useCategoryActions from "@/app/finance/transaction/[[...id]]/components/hooks/useCategoryActions";
import GroupCategoryForm from "@/app/finance/transaction/[[...id]]/components/group/GroupCategoryForm";
import { Skeleton } from "@/lib/ui/skeleton";

type CategoryTable = ICategoriesByGroupIdQuery["categoriesByGroupId"][0];

interface GroupCategoryTableProps {
  groupId: string;
}

export default function CategoryTable({ groupId }: GroupCategoryTableProps) {
  const { data, loading } = useCategoriesByGroupIdQuery({
    variables: { transactionGroupId: groupId },
  });

  const columns: ColumnDef<CategoryTable>[] = [
    {
      accessorKey: "description",
      header: "Categoria",
      cell: CategoryDescriptionRender,
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: (info) =>
        info.getValue() === ITransactionCategoryTypeEnum.EXPENSES
          ? "Despesa"
          : "Receita",
    },
    {
      header: "Ações",
      cell: (cell: CellContext<CategoryTable, unknown>) =>
        CategoryActionsRender(cell, groupId),
      size: 100,
      maxSize: 100,
    },
  ];

  if (loading) {
    return (
      <DataTableSkeleton
        columns={columns}
        rows={8}
        onMobileRender={MobileSkeleton}
      />
    );
  }

  return (
    <DataTable
      columns={columns}
      data={
        data
          ? [...data.categoriesByGroupId].sort((node) =>
              node.type === ITransactionCategoryTypeEnum.EARNINGS ? -1 : 1
            )
          : []
      }
      onMobileRender={(row) => GroupCategoryTableMobileRender(row, groupId)}
    />
  );
}

function GroupCategoryTableMobileRender(row: CategoryTable, groupId: string) {
  const { refresh } = useRouter();
  const { deleteCategory } = useCategoryActions();

  const IconComponent =
    arrayOfPossibleIcons.find(
      (node) => node.displayName === row.iconProperties.icon
    ) || TrophyIcon;

  const handleDelete = async () => {
    toast.promise(
      deleteCategory({
        variables: {
          id: row._id,
          groupId,
        },
      }),
      {
        position: "top-center",
        loading: "Deletando categoria...",
        success: "Categoria deletada com sucesso!",
        error: "Erro ao apagar a categoria",
      }
    );

    refresh();
  };

  return (
    <div className="flex w-full items-center justify-between ">
      <div className="flex items-center gap-2">
        <div
          className="flex size-10 items-center justify-center rounded-lg"
          style={{
            backgroundColor: hexToRgba(row.iconProperties.background, 0.5),
          }}
        >
          <IconComponent
            size={24}
            style={{ color: row.iconProperties.color }}
          />
        </div>

        <div className="space-y-0.5">
          <h3 className="font-bold text-muted-foreground">{row.description}</h3>
          <p className="text-sm text-zinc-600">
            {row.type === ITransactionCategoryTypeEnum.EXPENSES
              ? "Despesa"
              : "Receita"}
          </p>
        </div>
      </div>

      <Popover modal={true}>
        <PopoverTrigger className="flex lg:hidden">
          <EllipsisVerticalIcon className="stroke-muted-foreground" />
        </PopoverTrigger>

        <PopoverContent align="end" sideOffset={10} className="w-fit">
          <ul className="space-y-2 text-sm text-foreground">
            {/* EDITAR */}
            <li>
              <GroupCategoryForm
                groupId={groupId}
                initialValues={row}
                className="flex items-center gap-2"
              >
                <span className="flex items-center gap-2">
                  <PencilIcon size={16} className="stroke-1" />
                  Editar
                </span>
              </GroupCategoryForm>
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
                      Deseja mesmo excluir esta categoria?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação é irreversível e só será permitida caso não
                      existam transações vinculadas a esta categoria.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
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

function CategoryDescriptionRender(cell: CellContext<CategoryTable, unknown>) {
  const row = cell.row.original;
  const IconComponent =
    arrayOfPossibleIcons.find(
      (node) => node.displayName === row.iconProperties.icon
    ) || TrophyIcon;

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex size-6 items-center justify-center rounded-lg"
        style={{
          backgroundColor: hexToRgba(row.iconProperties.background, 0.5),
        }}
      >
        <IconComponent size={14} style={{ color: row.iconProperties.color }} />
      </div>

      <p className="text-sm text-foreground">{cell.getValue() as string}</p>
    </div>
  );
}

function CategoryActionsRender(
  cell: CellContext<CategoryTable, unknown>,
  groupId: string
) {
  const { refresh } = useRouter();
  const { deleteCategory } = useCategoryActions();

  const handleDelete = async () => {
    toast.promise(
      deleteCategory({
        variables: {
          id: cell.row.original._id,
          groupId,
        },
      }),
      {
        position: "top-center",
        loading: "Deletando categoria...",
        success: "Categoria deletada com sucesso!",
        error: "Erro ao apagar a categoria",
      }
    );

    refresh();
  };

  return (
    <div className="flex items-center space-x-2">
      <AlertDialog>
        <AlertDialogTrigger className="text-muted-foreground hover:text-foreground">
          <Trash2Icon size={20} className="stroke-1" />
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja mesmo excluir esta categoria?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação é irreversível e só será permitida caso não existam
              transações vinculadas a esta categoria.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <GroupCategoryForm
        groupId={groupId}
        className="text-muted-foreground hover:text-foreground"
        initialValues={cell.row.original}
      >
        <PencilIcon size={20} className="stroke-1" />
      </GroupCategoryForm>
    </div>
  );
}

function MobileSkeleton() {
  return (
    <div className="flex flex-col space-y-1">
      <Skeleton className="h-4 w-32 bg-secondary" />
      <Skeleton className="h-3 w-20 bg-secondary" />
    </div>
  );
}
