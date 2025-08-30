import SignupForm from "@/app/singup/SingupForm";

import routes from "@/utils/routes";
import Link from "next/link";

export default async function SingupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full p-6 bg-slate-800 ">
      <div className="mx-auto mt-8 w-full max-w-sm space-y-8 border p-5 rounded-lg bg-white">
        <div className="flex flex-col space-y-1">
          <p className="text-3xl text-foreground">Crie sua conta</p>
          <span className="text-sm text-neutral-500">
            Comece a usar a plataforma agora mesmo!
          </span>
        </div>

        <SignupForm />

        <p className="space-x-1 text-center text-sm tracking-wide">
          <span className="text-neutral-400">Tem uma conta?</span>
          <Link
            href={routes.signin}
            className="hover:neutral-300 text-foreground underline"
          >
            Faça login aqui.
          </Link>
        </p>

        <p className="text-center text-xs text-neutral-400">
          Ao continuar, você concorda com os Termos de Serviço e a Política de
          Privacidade do Supabase, além de receber emails periódicos com
          atualizações.
        </p>
      </div>
    </div>
  );
}
