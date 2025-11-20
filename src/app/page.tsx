import Header from "@/app/landing/header";
import Image from "next/image";

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
        </section>

        <section className="grid md:grid-cols-2 gap-8 my-20 w-full max-w-5xl">
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <Image
              src="/transacoes.png"
              alt="Controle de Despesas"
              width={400}
              height={300}
              className="rounded-md"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Acompanhe suas despesas com precisão
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
              Consulte seus gastos filtrando por mês e grupos, identificando
              rapidamente onde seu dinheiro está sendo investido.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <Image
              src="/graficoReceitasXGastos.png"
              alt="Metas Financeiras"
              width={400}
              height={300}
              className="rounded-md"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Analise seus gastos visualmente
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
              Explore gráficos interativos filtrados por mês e categorias para
              entender seus hábitos financeiros com mais clareza.
            </p>
          </div>
        </section>
      </main>
      <footer className="w-full text-center p-4 text-sm text-gray-500 dark:text-gray-400 border-t">
        © 2025 CASHTRACK. Todos os direitos reservados.
      </footer>
    </div>
  );
}
