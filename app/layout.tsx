import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gityp",
  description: "Gestión Integral de Transporte y Pagos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">      
      <body className={inter.className}>
        <div className="w-full flex">
          <aside>
            SideBar
          </aside>

          <main className="w-full">
            {children}
          </main>          
        </div>
      </body>
    </html>
  );
}
