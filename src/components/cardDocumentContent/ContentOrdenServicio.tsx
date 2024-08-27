import { formatCurrency, formatDate } from "@/src/lib";
import type { CardOrdenServicio, EstadoOrdenServicio } from "@/src/types";
import ButtonsOrdenServicio from "../cardDocumentButtons/ButtonsOrdenServicio";

type ContentOrdenServicioProps = {
    document: CardOrdenServicio;
}

export default function ContentOrdenServicio({document}: ContentOrdenServicioProps) {
    return (
        <div>
            <p className="text-right">{formatDate(document.fecha)}</p>
                                     
            <p className="font-bold text-lg pt-3">Orden de Servicio {' '}
                <span className="text-2xl break-words">#{document.id}</span>
            </p>
                     
            <div className="w-full p-1 bg-charColor-char4 rounded-lg my-2"></div>
                     
            <p className="font-semibold">Solicito: {' '}
                <span className="font-normal">{document.solicito}</span>
            </p>
                     
            { document.proveedor && (
                <p className="font-semibold">Proveedor: {' '}
                    <span className="font-normal">{document.proveedor}</span>
                </p>
            )}
                     
            { document.ordenCompra && (
                <p className="inline-block font-semibold py-1 px-3 my-1 bg-mutedColor-foreground text-white rounded-full">{document.ordenCompra}</p> 
            )}
            
            <p className="font-semibold py-2 text-right text-xl">{formatCurrency(document.total)}</p>

            <ButtonsOrdenServicio
                documentID={document.id}
                estadoDocument={document.estado as EstadoOrdenServicio} 
            />
        </div>
    )
}