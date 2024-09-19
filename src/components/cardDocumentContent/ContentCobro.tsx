import { formatCurrency, formatDate } from "@/src/lib";
import type { CardCobro } from "@/src/types";
import ButtonsCobro from "../cardDocumentButtons/ButtonsCobro";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";

type ContentCobroProps = {
    document: CardCobro;
    search?: Boolean;
}

export default function ContentCobro({document, search}: ContentCobroProps) {    
    return (
        <div>
            <p className="text-right">{formatDate(document.fecha)}</p>
                                     
            <p className="font-bold text-lg pt-3">Cobro {' '}
                <span className="text-2xl break-words">#{document.id}</span>
            </p>
                     
            <div className="w-full p-1 bg-charColor-char4 rounded-lg my-2"></div>
                     
            <p className="font-semibold">Solicito: {' '}
                <span className="font-normal">{document.factura.ordenServicio?.solicito}</span>
            </p>
                     
            { document.factura.ordenServicio?.proveedor && (
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
                     
            { document.factura.ordenServicio?.ordenCompra && (
                <p className="inline-block font-semibold py-1 px-3 my-1 bg-mutedColor-foreground text-white rounded-full">{document.factura.ordenServicio.ordenCompra}</p> 
            )}
            
            <p className="font-semibold py-2 text-right text-xl">{formatCurrency(document.factura.ordenServicio ? document.factura.ordenServicio.total : 0)}</p>
        
            {search ? 
                <div className="flex justify-center text-secondaryColor-foreground">
                    <Link 
                        className="border border-borderColor rounded hover:bg-borderColor" 
                        href={`/gestion-cobros/${document.id}`}
                    >
                        <EyeIcon className="size-7 my-1 mx-3"/>
                    </Link>
                </div> 
                :
                <ButtonsCobro document={document}/>
            }
        </div>
    )
}