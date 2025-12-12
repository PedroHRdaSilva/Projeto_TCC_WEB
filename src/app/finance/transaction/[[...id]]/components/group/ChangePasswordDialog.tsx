"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/lib/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/ui/form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/lib/ui/tabs";
import { toast } from "sonner";

import {
  useUpdateUserNameMutation,
  useUpdateUserPasswordMutation,
} from "@/graphql/hooks/graphqlHooks";
import { useRouter } from "next/navigation";

export default function EditUserDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const [UpdateUserName] = useUpdateUserNameMutation();
  const [UpdateUserPassword] = useUpdateUserPasswordMutation();
  const { refresh } = useRouter();
  const nameSchema = z.object({
    newName: z
      .string()
      .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  });

  const nameForm = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: { newName: "" },
  });

  function onSubmitName(values: z.infer<typeof nameSchema>) {
    toast.promise(
      (async () => {
        const { data } = await UpdateUserName({
          variables: {
            name: values.newName,
          },
        });

        if (!data?.updateUserName) {
          throw new Error("Erro ao criar usuário");
        }

        return true;
      })(),
      {
        loading: "Alterando nome...",
        success: "Nome Alterado com sucesso!",
        error: "Erro ao alterar nome",
      }
    );
    setIsOpen(false);
    refresh();
  }

  const passwordRequirements = [
    {
      key: "uppercase",
      message: "Letra Maiúscula",
      regex: /^(?=.*[A-Z])/,
    },
    {
      key: "lowercase",
      message: "Letra Minúscula",
      regex: /^(?=.*[a-z])/,
    },
    {
      key: "number",
      message: "Número",
      regex: /^(?=.*\d)/,
    },
    {
      key: "special",
      message: "Caractere Especial",
      regex: /^(?=.*[@$!%*?&])/,
    },
    {
      key: "length",
      message: "Mínimo de 8 caracteres",
      regex: /^.{8,}$/,
    },
  ];

  const passwordSchema = z
    .object({
      newPassword: z.string().min(1, "Digite sua nova senha"),
      confirmPassword: z.string().min(1, "Confirme sua nova senha"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const watchPassword = passwordForm.watch("newPassword");

  function onSubmitPassword(values: z.infer<typeof passwordSchema>) {
    toast.promise(
      (async () => {
        const { data } = await UpdateUserPassword({
          variables: {
            password: values.confirmPassword,
          },
        });

        if (!data?.updateUserPassword) {
          throw new Error("Erro ao alterar senha");
        }

        return true;
      })(),
      {
        loading: "Alterando senha...",
        success: "Senha alterada com sucesso!",
        error: "Erro ao alterar senha !",
      }
    );
    setIsOpen(false);
    refresh();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Configurações
          </DialogTitle>
          <DialogDescription>Atualize seu nome ou senha.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="mt-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="profile">Alterar nome</TabsTrigger>
            <TabsTrigger value="password">Alterar senha</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Form {...nameForm}>
              <form
                onSubmit={nameForm.handleSubmit(onSubmitName)}
                className="space-y-4"
              >
                <FormField
                  control={nameForm.control}
                  name="newName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Novo nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu novo nome" {...field} />
                      </FormControl>
                      <span className="h-2">
                        <FormMessage />
                      </span>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full mt-2 bg-green-700 hover:bg-green-700"
                >
                  Salvar
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="password" className="mt-6">
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
                className="space-y-6"
              >
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Nova senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Nova senha"
                          {...field}
                        />
                      </FormControl>

                      {fieldState.isDirty && (
                        <ul className="mt-2 flex flex-col space-y-1 text-sm text-neutral-400">
                          {passwordRequirements.map((rule) => (
                            <li
                              key={rule.key}
                              className="flex items-center space-x-2"
                            >
                              {rule.regex.test(watchPassword) ? (
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="#a3a3a3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="stroke-background"
                                  >
                                    <circle cx="12" cy="12" r="12" />
                                    <path d="m9 12 2 2 4-4" strokeWidth={2.5} />
                                  </svg>
                                </div>
                              ) : (
                                <div className="size-3.5 rounded-full border-[1.5px] border-neutral-400 bg-transparent" />
                              )}
                              <span>{rule.message}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar nova senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirme a nova senha"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full mt-2 bg-green-700 hover:bg-green-700"
                >
                  Salvar
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
