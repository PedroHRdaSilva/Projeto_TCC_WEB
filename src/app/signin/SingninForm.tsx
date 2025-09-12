"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useLoginWithCredentialsMutation } from "@/graphql/hooks/graphqlHooks";
import routes from "@/utils/routes";

export default function SigninForm() {
  const [loginWithCredentials, { loading }] = useLoginWithCredentialsMutation(
    {}
  );

  const form = useForm<SigninFormSchema>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SigninFormSchema) => {
    toast.promise(
      (async () => {
        const { data } = await loginWithCredentials({
          variables: {
            email: values.email,
            password: values.password,
          },
        });

        if (!data?.loginWithCredentials) {
          throw new Error("Credenciais inválidas");
        }

        await fetch("/api/signin", {
          method: "POST",
          body: JSON.stringify({ credentials: data.loginWithCredentials }),
          headers: { "Content-Type": "application/json" },
        });

        // redireciona
        window.location.href = routes.finance.transactions;
      })(),
      {
        loading: "Entrando...",
        success: "Login realizado com sucesso!",
        error: "Credenciais inválidas",
      }
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="voce@exemplo.com.br"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4 w-full">
            {loading ? "Aguarde..." : "Entrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
export const signinFormSchema = z.object({
  email: z.string().nonempty("Email é obrigatório").email("Email inválido"),
  password: z.string().nonempty("Senha é obrigatória"),
});

export type SigninFormSchema = z.infer<typeof signinFormSchema>;
