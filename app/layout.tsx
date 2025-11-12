import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/page_ui/Header";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import TanstackProvider from "@/lib/TanstackProvider/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "First Registrars eDoc Center",
  description: "eDocs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "white" }}>
        <MantineProvider>
          <Header />
          <TanstackProvider>
            <TooltipProvider>
              <Toaster />
              <main className="px-3 lg:px-14">{children}</main>
            </TooltipProvider>
          </TanstackProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
