import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

import { useTransactionStatusMutation } from "@/graphql/hooks/graphqlHooks";
import { ITransactionStatus } from "@/graphql/types/graphqlTypes";
import { Button } from "@/lib/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";

import type { InternalRefetchQueriesInclude } from "@apollo/client";

interface StatusPopoverProps {
  transactionIds: string[];
  refetchQueries: InternalRefetchQueriesInclude;
  onSuccess?: () => void;
}

export default function StatusPopover({
  transactionIds,
  refetchQueries,
  onSuccess,
}: StatusPopoverProps) {
  const [transactionStatus] = useTransactionStatusMutation();

  const handleStatus = async (status: ITransactionStatus) => {
    toast.promise(
      transactionStatus({
        variables: { id: transactionIds, status },
        refetchQueries,
      }),
      {
        position: "top-center",
        loading: "Alterando...",
        success: "Status alterado com sucesso!",
        error: "Erro ao alterar status",
      }
    );

    onSuccess?.();
  };
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button
          variant="outline"
          className="h-5 w-5 border-none hover:bg-transparent xl:bg-background"
        >
          <div>
            <ChevronDown size={20} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-2 w-full" align="end">
        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            onClick={() => handleStatus(ITransactionStatus.PENDING)}
          >
            <span>Pendente</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleStatus(ITransactionStatus.PAID)}
          >
            <span>
              <span>Pago</span>
            </span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
