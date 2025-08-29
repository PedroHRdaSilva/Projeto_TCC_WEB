import Link from "next/link";

import routes from "@/utils/routes";
import ForgotPasswordForm from "@/app/forgot-password/forgotPasswordFom";

export default async function ForgotPassordPage() {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-full p-6 lg:w-2/5">
        <div className="mx-auto flex h-full w-full max-w-sm flex-col justify-center space-y-8">
          <div className="flex flex-col space-y-1">
            <p className="text-3xl text-foreground">Esqueceu a senha?</p>
            <span className="text-sm text-neutral-500">
              Não se preocupe, enviaremos instruções para redefinição!
            </span>
          </div>

          <ForgotPasswordForm />

          <p className="space-x-1 text-center text-sm tracking-wide">
            <span className="text-neutral-400">Não tem uma conta?</span>
            <Link
              href={routes.signup}
              className="hover:neutral-300 text-foreground underline"
            >
              Crie sua conta aqui.
            </Link>
          </p>

          <p className="text-center text-xs text-neutral-400">
            Ao continuar, você concorda com os Termos de Serviço e a Política de
            Privacidade do Supabase, além de receber emails periódicos com
            atualizações.
          </p>
        </div>
      </div>
    </div>
  );
}
