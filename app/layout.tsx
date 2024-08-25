import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNavBar from "@/src/components/menu/SideNavBar";

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
      <body className={`${inter.className} bg-primaryColor-foreground`}>
        <div className="w-full flex">
          <aside>
            <SideNavBar />
          </aside>

          <main className="w-full mr-5 sm:mr-10 my-3">
            {children}
          </main>          
        </div>
      </body>
    </html>
  );
}
