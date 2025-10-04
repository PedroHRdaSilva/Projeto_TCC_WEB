"use client";

import { createGraphqlClient } from "@/lib/apollo/createGraphqlClient";
import { ViewerSession } from "@/lib/auth/actions";
import { ApolloProvider } from "@apollo/client";

import { ReactNode } from "react";

interface ApolloProviderClientrProps {
  session: ViewerSession;
  children: ReactNode;
}

export function ApolloProviderClient({
  children,
  session,
}: ApolloProviderClientrProps) {
  const client = createGraphqlClient(session);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
