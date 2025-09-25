import SignupForm from "@/app/signup/SingupForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";
import routes from "@/utils/routes";
import Link from "next/link";
import Image from "next/image";

export default async function SingupPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-primary p-4">
      <Image src="/LogoDark.svg" alt="Logo" width={600} height={120} />
      <Card className="w-full max-w-sm shadow-xl transition-shadow hover:shadow-2xl">
        <CardHeader className="space-y-1 p-6">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Crie sua conta
          </CardTitle>
          <CardDescription className="text-gray-600">
            Comece a usar a plataforma agora mesmo!
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <SignupForm />
        </CardContent>

        <CardFooter className="flex w-full flex-col items-start space-y-3 border-t p-6">
          <p className="space-x-1 text-center text-sm tracking-wide">
            <span className="text-gray-700">Já tem uma conta?</span>
            <Link
              href={routes.signin}
              className="font-semibold text-indigo-600 transition-colors duration-200 hover:text-indigo-800 hover:underline"
            >
              Faça login aqui.
            </Link>
          </p>

          <p className="text-xs text-gray-500">
            Ao continuar, você concorda com os Termos de Serviço e a Política de
            Privacidade do Supabase, além de receber emails periódicos com
            atualizações.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
