import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNavBar from "@/src/components/menu/SideNavBar";
import NavigationPath from "@/src/components/ui/NavigationPath";
import SearchBar from "@/src/components/busqueda/SearchBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <div className="py-5 ml-2 flex flex-col gap-3 md:flex-row md:gap-0 justify-between items-center">
              <NavigationPath />
              <SearchBar />
            </div>
            {children}
            <ToastContainer />
          </main>          
        </div>
      </body>
    </html>
  );
}
