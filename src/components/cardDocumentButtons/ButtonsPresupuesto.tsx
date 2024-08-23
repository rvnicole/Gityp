"use client"

import { useState } from "react";
import { ConfirmButton, SecondaryButton } from "../ui/Buttons";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { estadosPresupuesto } from "@/src/data/data";
import type { EstadoPresupuesto } from "@/src/types";

type ButtonsPresupuestosProps = {
    estadoDocument: EstadoPresupuesto;
}

export default function ButtonsPresupuestos({ estadoDocument }: ButtonsPresupuestosProps) {
    const [estado, setEstado] = useState<EstadoPresupuesto>(estadoDocument);

    const handleClickAccept = () => {
        setEstado('accept');
    }

    const handleClickReject = () => {
        setEstado('reject');
    }

    return (
        <>
            <p className={`${estado === "accept" ? "text-lime-500 font-bold" : "text-mutedColor-foreground"} pt-2 italic`}>
                {estadosPresupuesto[estado]}
            </p>

            { estado === "pending" && (
                <div className="flex justify-center gap-3 mt-4">
                    <ConfirmButton
                        onClick={handleClickAccept}
                    >
                        <CheckCircleIcon className="size-7 text-white"  />
                    </ConfirmButton>
                    
                    <SecondaryButton
                        onClick={handleClickReject}
                    >
                        <XCircleIcon className="size-7 text-secondaryColor-foreground" />
                    </SecondaryButton>
                </div>
            )}             
        </>
    )
}