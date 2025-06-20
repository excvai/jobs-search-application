import { Header } from "@/components/layout";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jobs Search Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
