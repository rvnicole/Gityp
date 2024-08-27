"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ConfirmButton, OutlineButton, PrimaryButton, SecondaryButton } from "../ui/Buttons";
import { EyeIcon, PlayIcon, HandThumbUpIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { estadosServicios } from "@/src/data/data";
import type { CardServicio, EstadoServicio } from "@/src/types";

type ButtonsServicioProps = {
    documentID: CardServicio['id'];
    estadoDocument: EstadoServicio;
}

export default function ButtonsServicio({documentID, estadoDocument}: ButtonsServicioProps) {
    const [estado, setEstado] = useState<EstadoServicio>(estadoDocument);
    const router = useRouter();

    const handleClickInProgress = () => {
        setEstado('inProgress');
    }

    const handleClickComplete = () => {
        setEstado('complete');
    }

    const handleClickNoShow = () => {
        setEstado('noShow');
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
                                onClick={handleClickInProgress}
                                attributes={{ title: "En progreso"}}
                            >
                                <PlayIcon className="size-7 text-white" />
                            </PrimaryButton>
                        )}

                        <ConfirmButton
                            onClick={handleClickComplete}
                            attributes={{ title: "Completado"}}
                        >
                            <HandThumbUpIcon className="size-7 text-white"  />
                        </ConfirmButton>

                        <SecondaryButton
                            onClick={handleClickNoShow}
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