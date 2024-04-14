import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

import SessionClientProvider from "@/providers/SessionClientProvider";

import { twMerge } from "tailwind-merge";

import { Toaster } from "@/components/ui/toaster"

import Sidebar from "@/components/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"

const inter = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flow",
};

import getSession from "@/actions/getSession";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={twMerge(`flex ${inter.className}`)}>
      <SessionClientProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem 
          disableTransitionOnChange
        >
          {session && (
            <Sidebar />
          )}
            <ScrollArea>
              {children}  
            </ScrollArea>
          </ThemeProvider>
        </SessionClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
