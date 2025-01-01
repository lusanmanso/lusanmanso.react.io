import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="bg-custom-bg bg-cover bg-center min-h-screen font-sans">
      <body>
        <Header />
        <main className="flex-grow container mx-auto p-4 mt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}