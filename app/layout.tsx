import Link from "next/link";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>
        <Header />
        {children}
        <Link href="/produtos">Produtos</Link>
        <Link href="/tecnologias">Tecnologias</Link>
        <Footer />
      </body>
    </html>
  );
}
