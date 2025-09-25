import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/lib/ui/alertDialog";

interface DuplicateDescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkip: (open: boolean) => void;
}

export default function DuplicateDescriptionDialog({
  open,
  onOpenChange,
  onSkip,
}: DuplicateDescriptionDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>Descrição duplicada</AlertDialogTitle>
          <AlertDialogDescription>
            Já existe uma transação com esta descrição. Deseja realmente criar
            uma descrição duplicata?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onSkip?.(true);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
