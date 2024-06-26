import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./prosemirror.css";

import { AuthProvider } from "@/lib/providers/auth-provider";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { Container } from "@/components/layout/container";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Container>{children}</Container>
            <Toaster position="top-center" />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
