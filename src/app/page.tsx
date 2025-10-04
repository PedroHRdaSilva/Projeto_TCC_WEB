import Header from "@/app/landing/header";
import Image from "next/image";
import { Button } from "@/lib/ui/button";
import Link from "next/link";
import routes from "@/utils/routes";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center p-8">
        <section className="py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
            Gerencie suas finanças com facilidade
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Uma solução simples e poderosa para controlar suas despesas,
            receitas e alcançar seus objetivos financeiros.
          </p>
          <div className="mt-8 space-x-4">
            <Link href={routes.signup}>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full"
              >
                Comece agora
              </Button>
            </Link>
            <Link href={routes.signin}>
              <Button
                size="lg"
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800"
              >
                Acesse sua conta
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 my-20 w-full max-w-5xl">
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <Image
              src="/placeholder-image-1.svg"
              alt="Controle de Despesas"
              width={400}
              height={300}
              className="rounded-md"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Controle suas despesas
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
              Visualize seus gastos em categorias claras para saber para onde
              seu dinheiro está indo.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <Image
              src="/placeholder-image-2.svg"
              alt="Metas Financeiras"
              width={400}
              height={300}
              className="rounded-md"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Defina e alcance metas
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
              Crie metas de economia e acompanhe seu progresso de forma visual e
              motivadora.
            </p>
          </div>
        </section>
      </main>
      <footer className="w-full text-center p-4 text-sm text-gray-500 dark:text-gray-400 border-t">
        © 2025 Sua Empresa. Todos os direitos reservados.
      </footer>
    </div>
  );
}
