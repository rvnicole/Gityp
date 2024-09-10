"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ConfirmButton, OutlineButton, SecondaryButton } from "../ui/Buttons";
import { CheckCircleIcon, EyeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { estadosPresupuesto } from "@/src/data/data";
import type { CardPresupuesto, EstadoPresupuesto, OrdenServicio, Presupuesto } from "@/src/types";
import { createOrdenServicio } from "@/actions/orden-servicio-actions";
import { updateStatusPresupuesto } from "@/actions/presupuesto-actions";
import { toast } from 'react-toastify';

type ButtonsPresupuestosProps = {
    documentID: CardPresupuesto['id'];
    estadoDocument: EstadoPresupuesto;
}

export default function ButtonsPresupuestos({documentID, estadoDocument}: ButtonsPresupuestosProps) {
    const [estado, setEstado] = useState<EstadoPresupuesto>(estadoDocument);
    const router = useRouter();

    const handleClickAccept = async (id: Presupuesto['id']) => {
        const res = await updateStatusPresupuesto(id, 'accept');
        if( res.success ){
            toast.success(res.message as string);
            setEstado('accept');
        }
        else{
            toast.error(res.message as string);
        };        
    }

    const handleClickReject = async (id: Presupuesto['id']) => {
        const res = await updateStatusPresupuesto(id, 'reject');
        alert(res.message);
        if( res.success ){
            setEstado('reject');
        }; 
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
                            onClick={() => handleClickAccept(documentID)}
                            attributes={{ title: "Aprobado"}}
                        >
                            <CheckCircleIcon className="size-7 text-white"  />
                        </ConfirmButton>
                        
                        <SecondaryButton
                            onClick={() => handleClickReject(documentID)}
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