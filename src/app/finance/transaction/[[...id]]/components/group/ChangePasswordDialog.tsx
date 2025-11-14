"use client";

import { useState } from "react";
import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/lib/ui/dialog";

export default function EditUserDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [newName, setNewName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Preencha todos os campos");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    // Chamada da API para alterar a senha
    console.log({ currentPassword, newPassword });
    alert("Senha alterada com sucesso!");
    setIsOpen(false);
  }
  function disableSaveButton() {
    return (
      (!newName && (!newPassword || !confirmPassword || !currentPassword)) ||
      (!newName && !newPassword && !confirmPassword && !currentPassword)
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Editar perfil
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Atualize seu nome ou sua senha preenchendo os campos abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Alterar nome:</label>
            <Input
              type="text"
              placeholder="Novo nome"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <label className="text-sm font-medium">Senha atual</label>
            <Input
              type="password"
              placeholder="Digite sua senha atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Nova senha</label>
            <Input
              type="password"
              placeholder="Digite sua nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Confirmar nova senha</label>
            <Input
              type="password"
              placeholder="Confirme sua nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-4 flex gap-2">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="w-full"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="w-full bg-primary text-white"
            disabled={disableSaveButton()}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
