// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { parseCookies } from "nookies";

/**
 * Cria um Apollo Client que funciona tanto no client-side quanto no SSR.
 * @param serverCookies Opcional. Cookie string do request no server-side.
 */
export function createApolloClient(serverCookies?: string) {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  });

  const authLink = setContext((_, { headers }) => {
    let token: string | null = null;

    if (typeof window !== "undefined") {
      const cookies = parseCookies();
      token = cookies.accessToken || null;
    } else if (serverCookies) {
      const match = serverCookies.match(/accessToken=([^;]+)/);
      if (match) token = match[1];
    }

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

const client = createApolloClient();
export default client;
