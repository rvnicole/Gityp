import { evalDate, formatCurrency, formatDate } from "@/src/lib";
import type { CardFactura, EstadoFactura } from "@/src/types";
import ButtonsFactura from "../cardDocumentButtons/ButtonsFactura";

type ContentFacturaProps = {
    document: CardFactura;
}

export default function ContentFactura({document}: ContentFacturaProps) {
    return (
        <div>
            <p className="text-right">{formatDate(new Date(evalDate(document.fecha)))}</p>
                                     
            <p className="font-bold text-lg pt-3">Factura {' '}
                <span className="text-2xl break-words">#{document.folio}</span>
            </p>
            <p>{document.id}</p>
                     
            <div className="w-full p-1 bg-charColor-char4 rounded-lg my-2"></div>
                     
            <p className="font-semibold">Solicito: {' '}
                <span className="font-normal">{document.ordenServicio.solicito}</span>
            </p>
                     
            { document.ordenServicio.proveedor && (
                <p className="font-semibold">Proveedor: {' '}
                    <span className="font-normal">{document.ordenServicio.proveedor}</span>
                </p>
            )}

            { document.folio && (
                <p className="font-semibold">Folio: {' '}
                    <span className="font-normal">{document.folio}</span>
                </p>
            )}
                     
            { document.ordenServicio.ordenCompra && (
                <p className="inline-block font-semibold py-1 px-3 my-1 bg-mutedColor-foreground text-white rounded-full">{document.ordenServicio.ordenCompra}</p> 
            )}
            
            <p className="font-semibold py-2 text-right text-xl">{formatCurrency(document.ordenServicio.total)}</p>

            <ButtonsFactura
                documentID={document.id}
                estadoDocument={document.estado as EstadoFactura} 
            />
        </div>
    )
}