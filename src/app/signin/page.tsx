import SigninForm from "@/app/signin/SingninForm";

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

export default async function SigninPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-blue-400 p-4">
      <Image src="/LogoDark.svg" alt="Logo" width={600} height={120} />
      <Card className="w-full max-w-sm shadow-xl transition-shadow hover:shadow-2xl">
        <CardHeader className="space-y-1 p-6">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Acesse sua conta
          </CardTitle>
          <CardDescription className="text-gray-600">
            Informe seu e-mail abaixo para fazer login.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <SigninForm />
        </CardContent>

        <CardFooter className="flex w-full flex-col items-start space-y-3 border-t p-6">
          <Link
            href={routes.forgotPassword}
            className="text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
          >
            Esqueceu a senha?
          </Link>

          <p className="text-sm text-gray-700">
            Ainda não tem cadastro?{" "}
            <Link
              href={routes.signup}
              className="font-semibold text-indigo-600 transition-colors duration-200 hover:text-indigo-800 hover:underline"
              color="primary"
            >
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
