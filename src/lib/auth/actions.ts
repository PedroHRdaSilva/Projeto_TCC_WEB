// lib/auth/actions.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Defina o tipo do payload do seu token
export type TokenPayload = {
  // Ajuste este tipo para corresponder ao seu token JWT
  userId: string;
  iat: number;
  exp: number;
};

// Esta função agora é exclusiva para o servidor
export async function getViewerSession(): Promise<TokenPayload | null> {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;

    if (!token) {
      return null;
    }

    // Use jwt.verify para uma verificação segura no servidor
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as TokenPayload;

    return decoded;
  } catch (error) {
    console.error("Erro ao verificar token no servidor:", error);
    return null;
  }
}

export async function logout() {
  const cookieStore = cookies();
  (await cookieStore).delete("accessToken");
}
