"use client"

import { useState } from "react";
import { ConfirmButton } from "../ui/Buttons";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { estadosFactura } from "@/src/data/data";
import type { EstadoFactura } from "@/src/types";

type ButtonsPresupuestosProps = {
    estadoDocument: EstadoFactura;
}

export default function ButtonsFactura({ estadoDocument }: ButtonsPresupuestosProps) {
    const [estado, setEstado] = useState<EstadoFactura>(estadoDocument);

    const handleClickSealed = () => {
        setEstado('sealed');
    }

    return (
        <>
            <p className={`${estado === "sealed" ? "text-lime-500 font-bold" : "text-mutedColor-foreground"} pt-2 italic`}>
                {estadosFactura[estado]}
            </p>

            { estado === "notsealed" && (
                <div className="flex justify-center gap-3 mt-4">
                    <ConfirmButton
                        onClick={handleClickSealed}
                    >
                        <CheckBadgeIcon className="size-7 text-white"  />
                    </ConfirmButton>
                </div>
            )}             
        </>
    )
}