"use client";

import client from "@/lib/apollo/apollo-client";
import { ApolloProvider } from "@apollo/client";

import { ReactNode } from "react";

export function ApolloProviderClient({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
