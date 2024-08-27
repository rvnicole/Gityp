import { formatCurrency, formatDate } from "@/src/lib";
import type { CardPresupuesto, EstadoPresupuesto } from "@/src/types";
import ButtonsPresupuestos from "../cardDocumentButtons/ButtonsPresupuesto";

type ContentPresupuestoProps = {
    document: CardPresupuesto;
}

export default function ContentPresupuesto({document}: ContentPresupuestoProps) {
    return (
        <div>
            <p className="text-right">{formatDate(document.fecha)}</p>
                                     
            <p className="font-bold text-lg pt-3">Presupuesto{' '}
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
            
            <p className="font-semibold py-2 text-right text-xl">{formatCurrency(document.total)}</p>

            <ButtonsPresupuestos 
                documentID={document.id}
                estadoDocument={document.estado as EstadoPresupuesto}
            />
        </div>
    )
}