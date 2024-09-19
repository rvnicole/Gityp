"use client"

import { useState } from "react";
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { HomeIcon, CalculatorIcon, ClipboardDocumentCheckIcon, CalendarDaysIcon, DocumentCurrencyDollarIcon, CurrencyDollarIcon, Cog8ToothIcon, TruckIcon} from "@heroicons/react/24/outline";
import MenuOption from "./MenuOption";

export default function SideNavBar() {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <div className={`${showMenu? "md:w-60" : "md:w-28"} w-full fixed md:sticky top-0 h-20 md:h-screen p-3 backdrop-blur-md`}>
            <div className="flex">
                <div 
                    className={`${showMenu ? "md:w-56" : "md:w-14"} w-full h-14 md:h-[96.5vh] flex md:flex-col justify-center bg-backgroundColor rounded-xl text-mutedColor-foreground border border-borderColor`}
                >
                    <MenuOption
                        option="Inicio"
                        url="/"
                        showMenu={showMenu}
                    >
                        <HomeIcon className="size-7 md:size-8"/>
                    </MenuOption>

                    <MenuOption
                        option="Presupuestos"
                        url="/presupuestos"
                        showMenu={showMenu}
                    >
                        <CalculatorIcon className="size-7 md:size-8"/>
                    </MenuOption>

                    <MenuOption
                        option="Ordenes de Servicio"
                        url="/ordenes-servicios"
                        showMenu={showMenu}
                    >
                        <ClipboardDocumentCheckIcon className="size-7 md:size-8"/>
                    </MenuOption>

                    <MenuOption
                        option="Servicios"
                        url="/servicios"
                        showMenu={showMenu}
                    >
                        <TruckIcon className="size-7 md:size-8"/>
                    </MenuOption>

                    <MenuOption
                        option="Facturación"
                        url="/facturacion"
                        showMenu={showMenu}
                    >
                        <DocumentCurrencyDollarIcon className="size-7 md:size-8"/>
                    </MenuOption>

                    <MenuOption
                        option="Gestión de Cobros"
                        url="/gestion-cobros"
                        showMenu={showMenu}
                    >
                        <CurrencyDollarIcon className="size-7 md:size-8"/>
                    </MenuOption>

                    <MenuOption
                        option="Configuración"
                        url="/configuracion"
                        showMenu={showMenu}
                    >
                        <Cog8ToothIcon className="size-7 md:size-8"/>
                    </MenuOption>                    
                </div>

                <div className="hidden m-auto md:block">
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