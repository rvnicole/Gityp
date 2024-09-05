"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ConfirmButton, OutlineButton } from "../ui/Buttons";
import { CheckBadgeIcon, EyeIcon } from "@heroicons/react/24/outline";
import { estadosFactura } from "@/src/data/data";
import type { CardFactura, EstadoFactura, Factura } from "@/src/types";
import { checkFullDataFactura, updateEstadoFactura } from "@/actions/factura-actions";

type ButtonsPresupuestosProps = {
    documentID: CardFactura['id'];
    estadoDocument: EstadoFactura;
}

export default function ButtonsFactura({documentID, estadoDocument}: ButtonsPresupuestosProps) {
    const [estado, setEstado] = useState<EstadoFactura>(estadoDocument);
    const router = useRouter();

    const handleClickSealed = async (id: Factura['id']) => {
        const resCheck = await checkFullDataFactura(id);
        if( !resCheck.success ){
            router.push(`/facturacion/?documentID=${documentID}&modal=create`);
            return;
        };

        const res = await updateEstadoFactura(id);
        alert(res.message);
        if( res.success ){
            setEstado('sealed');
        };              
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
                        onClick={() => handleClickSealed(documentID)}
                        attributes={{ title: "Sellado"}}
                    >
                        <CheckBadgeIcon className="size-7 text-white"  />
                    </ConfirmButton>
                )} 
            </div>            
        </>
    )
}