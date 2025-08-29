"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useResetPasswordMutation } from "@/graphql/hooks/graphqlHooks";
import { Button } from "@/lib/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/ui/form";
import { Input } from "@/lib/ui/input";
import routes from "@/utils/routes";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [resetPassword, { loading }] = useResetPasswordMutation({});
  const form = useForm<ResetPasswordFormSchema>({
    mode: "onChange",
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormSchema) => {
    toast.promise(
      (async () => {
        const { data } = await resetPassword({
          variables: {
            password: values.password,
            token: token,
          },
        });

        if (!data || !data.resetPassword) {
          return;
        }

        window.location.href = routes.signin;
      })(),
      {
        loading: "Alterando a senha...",
        success: "Senha alterada  com sucesso!",
        error: "Erro ao alterar senha.",
      }
    );
  };

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");
  return (
    <div className="flex flex-col space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>

                {fieldState.isDirty && (
                  <ul className="flex flex-col space-y-1 text-sm text-neutral-400">
                    {[
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
                    ].map((node) => (
                      <li
                        key={node.key}
                        className="flex items-center space-x-2"
                      >
                        {node.regex.test(password) ? (
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
                        <span>{node.message}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 w-full"
            disabled={
              !form.formState.isDirty ||
              !form.formState.errors ||
              password !== confirmPassword
            }
          >
            {loading ? "Aguarde..." : "Redefinir senha"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

const ResetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "A senha deve conter letras maiúsculas, minúsculas, número e caractere especial"
      ),
    confirmPassword: z.string().min(1, "Confirmar senha é obrigatório"),
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: "custom",
        message: "Senhas nao sao iguais",
        path: ["confirmPassword"],
      });
    }
  });

type ResetPasswordFormSchema = z.infer<typeof ResetPasswordFormSchema>;
