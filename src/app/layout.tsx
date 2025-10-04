import { DM_Sans } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import { ApolloProviderClient } from "@/lib/apollo/ApolloProviderCliente";
import { cn } from "@/lib/utils/utils";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { getViewerSession } from "@/lib/auth/actions";

const DMSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getViewerSession();

  return (
    <html lang="pt-BR">
      <body className={cn("w-screen overflow-x-hidden", DMSans.className)}>
        <NuqsAdapter>
          <ApolloProviderClient session={session}>
            <AuthProvider>
              {children}
              <Toaster position="bottom-right" richColors />
            </AuthProvider>
          </ApolloProviderClient>
        </NuqsAdapter>
      </body>
    </html>
  );
}
