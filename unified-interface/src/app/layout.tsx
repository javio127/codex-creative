import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unified Interface - AI-Powered Content Canvas",
  description: "A unified, cross-platform interface that seamlessly integrates content from multiple sources using AI agents and MCP servers.",
  keywords: ["AI", "unified interface", "content aggregation", "MCP", "thought space"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} antialiased h-full overflow-hidden font-sans`}>
        {children}
      </body>
    </html>
  );
}
