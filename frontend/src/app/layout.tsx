import NavLinks from "@/components/NavLinks";
import { AuthTokenProvider } from "@/providers/AuthTokenProvider";
import { LoadingProvider } from "@/providers/LoadingProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task App",
  description: "Task App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AuthTokenProvider>
          <LoadingProvider>
            <div className="mb-5">
              <NavLinks />
            </div>
            {children}
          </LoadingProvider>
        </AuthTokenProvider>
      </body>
    </html>
  );
}
