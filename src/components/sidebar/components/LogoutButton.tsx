"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import routes from "@/utils/routes";

export default function LogoutButton() {
  const { replace } = useRouter();

  return (
    <button
      type="button"
      className="flex items-center justify-center space-x-2"
      onClick={() => {
        replace(routes.api.logout);
      }}
    >
      <LogOutIcon
        size={20}
        className="stroke-zinc-400"
        strokeWidth={2}
        absoluteStrokeWidth={true}
      />
      <span className="text-lg">Sair</span>
    </button>
  );
}
