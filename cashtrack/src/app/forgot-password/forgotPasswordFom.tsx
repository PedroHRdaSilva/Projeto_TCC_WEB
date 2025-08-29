"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useForgotPasswordMutation } from "@/graphql/hooks/graphqlHooks";
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

export default function ForgotPasswordForm() {
  const [ForgotPassword, { loading }] = useForgotPasswordMutation({});
  const form = useForm<ForgotPasswordFormSchema>({
    mode: "onChange",
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormSchema) => {
    toast.promise(
      ForgotPassword({
        variables: {
          email: values.email,
        },
      }),
      {
        loading: "Eviando email...",
        success: "Email eviado com sucesso!",
        error: "Erro ao enviar email",
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
                    type="email"
                    placeholder="voce@exemplo.com.br"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4 w-full"
            disabled={!form.formState.isDirty}
          >
            {loading ? "Aguarde..." : "Enviar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
export const ForgotPasswordFormSchema = z.object({
  email: z.string().email("Email inválido"),
});

export type ForgotPasswordFormSchema = z.infer<typeof ForgotPasswordFormSchema>;
