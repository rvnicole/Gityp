"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ConfirmButton, OutlineButton, PrimaryButton, SecondaryButton } from "../ui/Buttons";
import { EyeIcon, PlayIcon, HandThumbUpIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { estadosServicios } from "@/src/data/data";
import type { CardServicio, EstadoServicio } from "@/src/types";
import { updateEstadoServicio } from "@/actions/servicio-actions";
import { toast } from 'react-toastify';

type ButtonsServicioProps = {
    documentID: CardServicio['id'];
    estadoDocument: EstadoServicio;
}

export default function ButtonsServicio({documentID, estadoDocument}: ButtonsServicioProps) {
    console.log(estadoDocument, 'EStado document');
    const [estado, setEstado] = useState<EstadoServicio>(estadoDocument || 'assign');
    const router = useRouter();

    const handleClick = async (data: {id: CardServicio['id'], estado: EstadoServicio}) => {
        const respuesta = await updateEstadoServicio(data);

        if( respuesta.success ) {
            toast.success(respuesta.message as string);
            setEstado(data.estado);
            setTimeout(() => location.href = location.pathname, 2000);
        }
        else {
            toast.error(respuesta.message as string);
        }
    }

    return (
        <>
            <p className={`${estado === "complete" ? "text-lime-500 font-bold" : "text-mutedColor-foreground"} pt-2 italic`}>
                {estadosServicios[estado]}
            </p>

            <div className="flex justify-center gap-3 mt-4">
                <OutlineButton 
                    onClick={() => router.push(`/servicios/${documentID}`)}
                    attributes={{ title: "Ver Servicio"}}
                >
                    <EyeIcon className="size-7"/>
                </OutlineButton>

                { (estado === "assign" || estado === "inProgress") && (
                    <>
                        { estado !== "inProgress" && (
                            <PrimaryButton
                                onClick={() => handleClick({id: documentID, estado: "inProgress"})}
                                attributes={{ title: "En progreso"}}
                            >
                                <PlayIcon className="size-7 text-white" />
                            </PrimaryButton>
                        )}

                        <ConfirmButton
                            onClick={() => handleClick({id: documentID, estado: "complete"})}
                            attributes={{ title: "Completado"}}
                        >
                            <HandThumbUpIcon className="size-7 text-white"  />
                        </ConfirmButton>

                        <SecondaryButton
                            onClick={() => handleClick({id: documentID, estado: "noShow"})}
                            attributes={{ title: "No realizado"}}
                        >
                            <NoSymbolIcon className="size-7 text-secondaryColor-foreground" />
                        </SecondaryButton>                        
                    </>
                )}    
            </div>                     
        </>
    )
}