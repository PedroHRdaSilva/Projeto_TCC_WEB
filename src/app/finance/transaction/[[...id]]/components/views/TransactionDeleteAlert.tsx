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

import type { InternalRefetchQueriesInclude } from "@apollo/client";
import useTransactionActions from "@/app/finance/transaction/[[...id]]/components/hooks/useTransactionActions";

interface DeleteGroupAlertProps {
  transactionId: string;
  refetchQueries: InternalRefetchQueriesInclude;
}

export default function TransactionDeleteAlert({
  transactionId,
  refetchQueries,
}: DeleteGroupAlertProps) {
  const { deleteTransaction } = useTransactionActions();

  const onSubmit = async () => {
    toast.promise(
      deleteTransaction({
        variables: {
          id: transactionId,
        },
        refetchQueries,
      }),
      {
        loading: "Deletando Transação...",
        success: "Transação deletada com sucesso!",
        error: "Erro ao deletar a Transação.",
      }
    );
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center justify-center">
          <Trash2Icon size={20} className="stroke-muted-foreground stroke-1" />
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-80 lg:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base lg:text-lg">
              Deseja mesmo excluir esta transação?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação é permanente e removerá todas as informações
              relacionadas a esta transação do sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await onSubmit();
              }}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
