"use client"

import { useRouter } from "next/navigation";
import { OutlineButton } from "../ui/Buttons";
import { EyeIcon } from "@heroicons/react/24/outline";
import { estadosOrdenServicio } from "@/src/data/data";
import type { CardDocumentInfo, EstadoOrdenServicio } from "@/src/types";

type ButtonsOrdenServicioProps = {
    documentID: CardDocumentInfo['id'];
    estadoDocument: EstadoOrdenServicio;
}

export default function ButtonsOrdenServicio({documentID, estadoDocument}: ButtonsOrdenServicioProps) {
    const router = useRouter();
    
    return (
        <>
            <p className={`${estadoDocument === "complete" ? "text-lime-500 font-bold" : "text-mutedColor-foreground"} pt-2 italic`}>
                {estadosOrdenServicio[estadoDocument]}
            </p>

            <div className="flex justify-center gap-3 mt-4">
                <OutlineButton 
                    onClick={() => router.push(`/ordenes-servicios/${documentID}`)}
                    attributes={{ title: "Ver Orden de Servicio"}}
                >
                    <EyeIcon className="size-7"/>
                </OutlineButton>
            </div>  
        </>
    )
}