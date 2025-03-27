"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

import { ReactNode, useState } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="pt">
      <title>Clima</title>
      <meta name="description" content="Descrição do meu site" />

      <body>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
