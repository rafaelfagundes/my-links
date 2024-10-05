import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Outfit as SansSerif } from "next/font/google";
import "./globals.css";
const sansSerif = SansSerif({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Rafael Fagundes",
  description: "Check out my social links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          defer
          data-domain="rfagund.es"
          src="https://plausible.rfagund.es/js/script.js"
        ></script>
      </head>
      <body className={`${sansSerif.className} antialiased`}>
        <NextThemesProvider defaultTheme="system" attribute="class">
          {children}
          <Toaster
            toastOptions={{
              unstyled: false,
              classNames: {
                toast:
                  "bg-gray-100 dark:bg-zinc-800 text-black dark:text-white rounded-lg shadow-lg border-gray-200 dark:border-zinc-800 border p-4 sm:p-5 w-full max-w-sm",
              },
            }}
          />
        </NextThemesProvider>
      </body>
    </html>
  );
}
