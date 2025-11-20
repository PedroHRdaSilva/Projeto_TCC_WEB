"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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

import { useCreateUserMutation } from "@/graphql/hooks/graphqlHooks";

export default function SignupForm() {
  const [createUser, { loading }] = useCreateUserMutation({});

  const form = useForm<SignupFormSchema>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupFormSchema) => {
    toast.promise(
      (async () => {
        const { data } = await createUser({
          variables: {
            createUserInput: {
              email: values.email,
              name: values.name,
              password: values.password,
            },
          },
        });

        if (!data?.createUser) {
          throw new Error("Erro ao criar usuário");
        }

        return true;
      })(),
      {
        loading: "Criando usuário...",
        success: "Usuário criado com sucesso!",
        error: "Erro ao criar usuário",
      }
    );
  };

  const password = form.watch("password") ?? "";

  return (
    <div className="flex flex-col space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <div className="h-4 ">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="voce@exemplo.com.br" {...field} />
                </FormControl>
                <div className="h-4 ">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
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
                        message: "Letra maiúscula",
                        regex: /[A-Z]/,
                      },
                      {
                        key: "lowercase",
                        message: "Letra minúscula",
                        regex: /[a-z]/,
                      },
                      {
                        key: "number",
                        message: "Número",
                        regex: /\d/,
                      },
                      {
                        key: "special",
                        message: "Caractere especial",
                        regex: /[^A-Za-z0-9]/,
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
                          <div className="h-3.5 w-3.5 rounded-full border-[1.5px] border-neutral-400 bg-transparent" />
                        )}
                        <span>{node.message}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 w-full"
            disabled={!form.formState.isValid || loading}
          >
            {loading ? "Aguarde..." : "Cadastrar-se"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

const signupFormSchema = z.object({
  name: z.string(),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      "A senha deve conter letras maiúsculas, minúsculas, número e caractere especial"
    ),
});

type SignupFormSchema = z.infer<typeof signupFormSchema>;
