import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import { ApolloProviderClient } from "@/lib/apollo/ApolloProviderCliente";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NuqsAdapter>
          <ApolloProviderClient>
            {children}
            <Toaster position="bottom-right" richColors />
          </ApolloProviderClient>
        </NuqsAdapter>
      </body>
    </html>
  );
}
