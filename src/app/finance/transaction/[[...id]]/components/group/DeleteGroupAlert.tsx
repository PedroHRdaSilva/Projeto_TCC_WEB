"use client";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

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
import { useDeleteTransactionGroupMutation } from "@/graphql/hooks/graphqlHooks";
import TransactionsGroupQuery from "@/graphql/queries/transactions/TransactionsGroupQuery";
import TransactionGroupByIdQuery from "@/graphql/queries/transactions/TransactionGroupByIdQuery";

interface DeleteGroupAlertProps {
  groupIdPage?: string;
  groupId: string;
  onDelete: (deletado: boolean) => void;
  mobile?: boolean;
}

export default function DeleteGroupAlert({
  groupIdPage,
  groupId,
  onDelete,
  mobile,
}: DeleteGroupAlertProps) {
  const [deleteTransactionGroup] = useDeleteTransactionGroupMutation();
  //   const revalidateAndRefresh = useRevalidateAndRefresh();
  const onSubmit = async () => {
    toast.promise(
      deleteTransactionGroup({
        variables: {
          _id: groupId,
        },
        refetchQueries: [
          {
            query: TransactionsGroupQuery,
            variables: {
              search: null,
            },
          },
          {
            query: TransactionGroupByIdQuery,
            variables: {
              _id: undefined,
            },
          },
        ],
      }),
      {
        loading: "Deletando grupo ...",
        success: "Grupo deletado com sucesso!",
        error: "Erro ao deletar o grupo.",
      }
    );
    if (groupId === groupIdPage) {
      onDelete(false);
      //   revalidateAndRefresh("transactionGroup", 50);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center justify-center">
        {mobile ? (
          <span className="p-1">Excluir</span>
        ) : (
          <Trash2Icon size={18} />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja mesmo excluir este grupo?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação é permanente e removerá todas as informações relacionadas
            a este grupo do sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onSubmit();
            }}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
