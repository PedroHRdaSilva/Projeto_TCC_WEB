import { notFound, redirect, RedirectType } from "next/navigation";

import routes from "@/utils/routes";

import type { ApolloError } from "@apollo/client";

interface ServerErrorProps {
  error: ApolloError["graphQLErrors"][0];
}

export default async function ServerError({ error }: ServerErrorProps) {
  const { extensions } = error;

  if (extensions) {
    if (extensions.code === "UNAUTHENTICATED") {
      redirect(routes.api.logout, RedirectType.replace);
    } else if (extensions.code === "FORBIDDEN") {
      redirect(routes.finance.dashboard, RedirectType.replace);
    }
  }

  return notFound();
}
