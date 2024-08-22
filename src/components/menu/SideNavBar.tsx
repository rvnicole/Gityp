"use client"

import { useState } from "react";
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { HomeIcon, CalculatorIcon, ClipboardDocumentCheckIcon, CalendarDaysIcon, DocumentCurrencyDollarIcon, CurrencyDollarIcon, Cog8ToothIcon} from "@heroicons/react/24/outline";
import MenuOption from "./MenuOption";

export default function SideNavBar() {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <div className={`${showMenu? "w-60" : "w-28"} sticky top-0 h-screen p-3`}>
            <div className="flex">
                <div 
                    className={`${showMenu ? "w-56" : "w-14"} bg-backgroundColor h-[96.5vh] flex flex-col justify-center rounded-xl text-mutedColor-foreground border border-borderColor`}
                >
                    <MenuOption
                        option="Inicio"
                        url="/"
                        showMenu={showMenu}
                    >
                        <HomeIcon className="size-8"/>
                    </MenuOption>

                    <MenuOption
                        option="Presupuestos"
                        url="/presupuestos"
                        showMenu={showMenu}
                    >
                        <CalculatorIcon className="size-8"/>
                    </MenuOption>

                    <MenuOption
                        option="Ordenes de Servicio"
                        url="/ordenes-servicios"
                        showMenu={showMenu}
                    >
                        <ClipboardDocumentCheckIcon className="size-8"/>
                    </MenuOption>

                    <MenuOption
                        option="Servicios"
                        url="/servicios"
                        showMenu={showMenu}
                    >
                        <CalendarDaysIcon className="size-8"/>
                    </MenuOption>

                    <MenuOption
                        option="Facturación"
                        url="/facturacion"
                        showMenu={showMenu}
                    >
                        <DocumentCurrencyDollarIcon className="size-8"/>
                    </MenuOption>

                    <MenuOption
                        option="Gestión de Cobros"
                        url="/gestion-cobros"
                        showMenu={showMenu}
                    >
                        <CurrencyDollarIcon className="size-8"/>
                    </MenuOption>

                    <MenuOption
                        option="Configuración"
                        url="/configuracion"
                        showMenu={showMenu}
                    >
                        <Cog8ToothIcon className="size-8"/>
                    </MenuOption>                    
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