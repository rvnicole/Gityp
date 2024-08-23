import { estadosOrdenServicio } from "@/src/data/data";
import type { EstadoOrdenServicio } from "@/src/types";

type ButtonsOrdenServicioProps = {
    estadoDocument: EstadoOrdenServicio;
}

export default function ButtonsOrdenServicio({ estadoDocument }: ButtonsOrdenServicioProps) {
    return (
        <>
            <p className={`${estadoDocument === "complete" ? "text-lime-500 font-bold" : "text-mutedColor-foreground"} pt-2 italic`}>
                {estadosOrdenServicio[estadoDocument]}
            </p>            
        </>
    )
}