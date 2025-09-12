import { createApolloClient } from "@/lib/apollo/apollo-client";
import { cookies } from "next/headers";

export async function getAuthenticatedClient() {
  const cookieStore = await cookies();
  const initialCookies = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  return createApolloClient(initialCookies);
}
