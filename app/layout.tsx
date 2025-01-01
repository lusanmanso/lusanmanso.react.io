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
        <Footer />
      </body>
    </html>
  );
}
