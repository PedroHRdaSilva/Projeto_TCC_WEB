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

export default async function SigninPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SigninForm />
        </CardContent>

        <CardFooter className="flex  w-full flex-col items-start ">
          <Link
            href={routes.forgotPassword}
            className=" inline-block  underline-offset-4 hover:underline"
          >
            Esqueceu a senha?
          </Link>
          <span className="text-base">
            Ainda nao tem cadastro?
            <Link
              href={routes.signup}
              className="hover:neutral-300 text-foreground underline"
            >
              Cadastre-se
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
