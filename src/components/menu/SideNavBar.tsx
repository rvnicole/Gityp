"use client"

import { useState } from "react";
import Link from "next/link";
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { HomeIcon, CalculatorIcon, ClipboardDocumentCheckIcon, CalendarDaysIcon, DocumentCurrencyDollarIcon, CurrencyDollarIcon, Cog8ToothIcon} from "@heroicons/react/24/outline";

export default function SideNavBar() {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <div className={`${showMenu? "w-60" : "w-28"} sticky top-0 h-screen p-3`}>
            <div className="flex">
                <div 
                    className={`${showMenu ? "w-56" : "w-14"} bg-backgroundColor h-[96.5vh] flex flex-col justify-center rounded-xl text-mutedColor-foreground border border-borderColor`}
                >
                    <Link
                        className="flex items-center p-2 mx-1 rounded-xl hover:text-accentColor-foreground hover:bg-accentColor"
                        href={'/'}
                    >
                        <HomeIcon className="size-8"/>
                        { showMenu && <p className="px-2">Inicio</p>}
                    </Link>

                    <Link
                        className="flex items-center p-2 mx-1 rounded-xl hover:text-accentColor-foreground hover:bg-accentColor"
                        href={'/presupuestos'}
                    >
                        <CalculatorIcon className="size-8"/>
                        { showMenu && <p className="px-2">Presupuestos</p>}
                    </Link>

                    <Link
                        className="flex items-center p-2 mx-1 rounded-xl hover:text-accentColor-foreground hover:bg-accentColor"
                        href={'/ordenes-servicios'}
                    >
                        <ClipboardDocumentCheckIcon className="size-8"/>
                        { showMenu && <p className="px-2">Ordenes de<br /> Servicio</p>}
                    </Link>

                    <Link
                        className="flex items-center p-2 mx-1 rounded-xl hover:text-accentColor-foreground hover:bg-accentColor"
                        href={'/servicios'}
                    >
                        <CalendarDaysIcon className="size-8"/>
                        { showMenu && <p className="px-2">Servicios</p>}
                    </Link>

                    <Link
                        className="flex items-center p-2 mx-1 rounded-xl hover:text-accentColor-foreground hover:bg-accentColor"
                        href={'/facturacion'}
                    >
                        <DocumentCurrencyDollarIcon className="size-8"/>
                        { showMenu && <p className="px-2">Facturación</p>}
                    </Link>

                    <Link
                        className="flex items-center p-2 mx-1 rounded-xl hover:text-accentColor-foreground hover:bg-accentColor"
                        href={'/gestion-cobros'}
                    >
                        <CurrencyDollarIcon className="size-8"/>
                        { showMenu && <p className="px-2">Gestión de <br /> Cobros</p>}
                    </Link>

                    <Link
                        className="flex items-center p-2 mx-1 rounded-xl hover:text-accentColor-foreground hover:bg-accentColor"
                        href={'/configuracion'}
                    >
                        <Cog8ToothIcon className="size-8"/>
                        { showMenu && <p className="px-2">Configuración</p>}
                    </Link>                    
                </div>

                <div className="m-auto">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        { showMenu ? (
                            <ArrowLeftCircleIcon className="size-8 text-inputColor hover:text-primaryColor"/>
                        ) : (
                            <ArrowRightCircleIcon className="size-8 text-inputColor hover:text-primaryColor"/>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}