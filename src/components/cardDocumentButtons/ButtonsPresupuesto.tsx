"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ConfirmButton, OutlineButton, SecondaryButton } from "../ui/Buttons";
import { CheckCircleIcon, EyeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { estadosPresupuesto } from "@/src/data/data";
import type { CardPresupuesto, EstadoPresupuesto } from "@/src/types";

type ButtonsPresupuestosProps = {
    documentID: CardPresupuesto['id'];
    estadoDocument: EstadoPresupuesto;
}

export default function ButtonsPresupuestos({documentID, estadoDocument}: ButtonsPresupuestosProps) {
    const [estado, setEstado] = useState<EstadoPresupuesto>(estadoDocument);
    const router = useRouter();

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

            <div className="flex justify-center gap-3 mt-4">
                <OutlineButton 
                    onClick={() => router.push(`/presupuestos/${documentID}`)}
                    attributes={{ title: "Ver Presupuesto"}}
                >
                    <EyeIcon className="size-7"/>
                </OutlineButton>
            
                { estado === "pending" && (
                    <>
                        <ConfirmButton
                            onClick={handleClickAccept}
                            attributes={{ title: "Aprobado"}}
                        >
                            <CheckCircleIcon className="size-7 text-white"  />
                        </ConfirmButton>
                        
                        <SecondaryButton
                            onClick={handleClickReject}
                            attributes={{ title: "Rechazado"}}
                        >
                            <XCircleIcon className="size-7" />
                        </SecondaryButton>
                    </>
                )}
            </div>            
        </>
    )
}