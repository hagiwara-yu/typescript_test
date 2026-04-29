import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloud Asset Dashboard",
  description: "Asset Inventory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        {/* ナビゲーション */}
        <header className="bg-gray-800 text-white px-6 py-3 flex gap-6">
          <Link href="/" className="font-bold hover:opacity-80">
            Home
          </Link>
          <Link href="/aws" className="hover:opacity-80">
            AWS
          </Link>
        </header>

        {/*　コンテンツ */}
        <main className="flex-1">{children}</main>

      </body>
    </html>
  );
}