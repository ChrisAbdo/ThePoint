import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./prosemirror.css";

import { AuthProvider } from "@/lib/providers/auth-provider";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Nav from "@/components/layout/nav";
import { TooltipProvider } from "@/components/ui/tooltip";
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
            <TooltipProvider>
              <Nav />
              <div className="grid w-full pl-[53px]  mx-auto max-w-5xl">
                {children}
              </div>
            </TooltipProvider>
            <Toaster position="top-center" />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
