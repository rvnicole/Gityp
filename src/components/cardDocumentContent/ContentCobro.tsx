import { formatCurrency, formatDate } from "@/src/lib";
import type { CardCobro } from "@/src/types";
import ButtonsCobro from "../cardDocumentButtons/ButtonsCobro";

type ContentCobroProps = {
    document: CardCobro;
}

export default function ContentCobro({document}: ContentCobroProps) {
    return (
        <div>
            <p className="text-right">{formatDate(document.factura.fecha)}</p>
                                     
            <p className="font-bold text-lg pt-3">Cobro {' '}
                <span className="text-2xl break-words">#{document.id}</span>
            </p>
                     
            <div className="w-full p-1 bg-charColor-char4 rounded-lg my-2"></div>
                     
            <p className="font-semibold">Solicito: {' '}
                <span className="font-normal">{document.factura.ordenServicio.solicito}</span>
            </p>
                     
            { document.factura.ordenServicio.proveedor && (
                <p className="font-semibold">Proveedor: {' '}
                    <span className="font-normal">{document.factura.ordenServicio.proveedor}</span>
                </p>
            )}

            { document.factura.folio && (
                <p className="font-semibold">Folio de Factura: {' '}
                    <span className="font-normal">{document.factura.folio}</span>
                </p>
            )}

            { document.ie && (
                <p className="font-semibold">IE: {' '}
                    <span className="font-normal">{document.ie}</span>
                </p>
            )}

            { document.edicom ?
                (<p className="font-semibold text-charColor-char4">Cargado en Edicom</p>)
                : (<p className="font-semibold">Sin cargar en Edicom</p>)
            }
                     
            { document.factura.ordenServicio.ordenCompra && (
                <p className="inline-block font-semibold py-1 px-3 my-1 bg-mutedColor-foreground text-white rounded-full">{document.factura.ordenServicio.ordenCompra}</p> 
            )}
            
            <p className="font-semibold py-2 text-right text-xl">{formatCurrency(document.factura.ordenServicio.total)}</p>
        
            <ButtonsCobro
                documentID={document.id}
                estadoDocument={document.pagado} 
                cargadoEdicom = {document.edicom}
            />
        </div>
    )
}