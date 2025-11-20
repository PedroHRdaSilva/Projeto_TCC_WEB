"use client";

import { Button } from "@/lib/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/signin");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
      <Image src="/LogoDark.svg" alt="Logo" width={200} height={40} />

      <div className="space-x-2 pr-4">
        <Button
          variant="outline"
          onClick={handleLogin}
          className="bg-blue-500 hover:text-white hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full"
        >
          Entrar
        </Button>
        <Button
          onClick={handleSignup}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full"
        >
          Cadastre-se
        </Button>
      </div>
    </header>
  );
}
