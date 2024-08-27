"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ConfirmButton, OutlineButton } from "../ui/Buttons";
import { CheckBadgeIcon, EyeIcon } from "@heroicons/react/24/outline";
import { estadosFactura } from "@/src/data/data";
import type { CardFactura, EstadoFactura } from "@/src/types";

type ButtonsPresupuestosProps = {
    documentID: CardFactura['id'];
    estadoDocument: EstadoFactura;
}

export default function ButtonsFactura({documentID, estadoDocument}: ButtonsPresupuestosProps) {
    const [estado, setEstado] = useState<EstadoFactura>(estadoDocument);
    const router = useRouter();

    const handleClickSealed = () => {
        router.push(`/facturacion/?documentID=${documentID}&modal=create`);
        setEstado('sealed');
    };

    return (
        <>
            <p className={`${estado === "sealed" ? "text-lime-500 font-bold" : "text-mutedColor-foreground"} pt-2 italic`}>
                {estadosFactura[estado]}
            </p>

            <div className="flex justify-center gap-3 mt-4">
                <OutlineButton 
                    onClick={() => router.push(`/facturacion/${documentID}`)}
                    attributes={{ title: "Ver Factura"}}
                >
                    <EyeIcon className="size-7"/>
                </OutlineButton>

                { estado === "notsealed" && (                    
                    <ConfirmButton
                        onClick={handleClickSealed}
                        attributes={{ title: "Sellado"}}
                    >
                        <CheckBadgeIcon className="size-7 text-white"  />
                    </ConfirmButton>
                )} 
            </div>            
        </>
    )
}