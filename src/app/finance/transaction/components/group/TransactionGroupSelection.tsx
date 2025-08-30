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

import { Search } from "lucide-react";
export default function TransactionGroupSelection() {
  return (
    <div className="">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
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
                />
              </div>
            </DialogHeader>
            <div></div>
            <DialogFooter></DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
