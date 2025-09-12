import "./globals.css";

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
        <ApolloProviderClient>
          {children}
          <Toaster position="bottom-right" richColors />
        </ApolloProviderClient>
      </body>
    </html>
  );
}
