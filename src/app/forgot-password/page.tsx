import Link from "next/link";
import Image from "next/image";

import routes from "@/utils/routes";
import ForgotPasswordForm from "@/app/forgot-password/forgotPasswordFom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";

export default async function ForgotPassordPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-blue-400 p-4">
      <Image src="/LogoDark.svg" alt="Logo" width={600} height={120} />

      <Card className="w-full max-w-sm shadow-xl transition-shadow hover:shadow-2xl">
        <CardHeader className="space-y-1 p-6">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Esqueceu sua senha?
          </CardTitle>
          <CardDescription className="text-gray-600">
            Informe seu e-mail abaixo para recuperar o acesso.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <ForgotPasswordForm />
        </CardContent>

        <CardFooter className="flex w-full flex-col items-start space-y-3 border-t p-6">
          <p className="text-sm text-gray-700">
            Lembrou sua senha?{" "}
            <Link
              href={routes.signin}
              className="font-semibold text-indigo-600 transition-colors duration-200 hover:text-indigo-800 hover:underline"
            >
              Entrar
            </Link>
          </p>

          <p className="text-sm text-gray-700">
            Não tem uma conta?{" "}
            <Link
              href={routes.signup}
              className="font-semibold text-indigo-600 transition-colors duration-200 hover:text-indigo-800 hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
