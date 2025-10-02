"use server";

import { cookies } from "next/headers";

// Defina o tipo do payload do seu token
export type TokenPayload = {
  // Ajuste este tipo para corresponder ao seu token JWT
  userId: string;
  iat: number;
  exp: number;
};
export type ViewerSession = {
  token: string;
} | null;
// Esta função agora é exclusiva para o servidor
export async function getViewerSession() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;

    if (!token) {
      return null;
    }

    // devolve o decoded + token original
    return {
      token, // token bruto
    };
  } catch (error) {
    console.error("Erro ao verificar token no servidor:", error);
    return null;
  }
}

export async function logout() {
  const cookieStore = cookies();
  (await cookieStore).delete("accessToken");
}
