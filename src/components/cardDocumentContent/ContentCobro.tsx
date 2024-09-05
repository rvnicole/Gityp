"use client"

import { formatCurrency, formatDate } from "@/src/lib";
import type { CardCobro } from "@/src/types";
import { useRouter } from "next/navigation";
import { ConfirmButton, OutlineButton, SecondaryButton } from "../ui/Buttons";
import { BanknotesIcon, DocumentCheckIcon, EyeIcon} from "@heroicons/react/24/outline";
import { updateEstadoCobro } from "@/actions/gestion-cobros-actions";

type ContentCobroProps = {
    document: CardCobro;
}

export default function ContentCobro({document}: ContentCobroProps) {
    const router = useRouter();

    const handleClick = async (document: CardCobro) => {
        if( !document.edicom || !document.ie ){
            router.push(`/gestion-cobros/?documentID=${document.id}&modal=create&pagado=${document.pagado}`);
            return;
        }

        const respuesta = await updateEstadoCobro({id: document.id, pagado: document.pagado});
        
        if( respuesta.success ){
            alert(respuesta.message);
        }
        else {
            alert(respuesta.message);
        }

        router.push(location.pathname);
    }
    
    return (
        <div>
            <p className="text-right">{formatDate(document.fecha)}</p>
                                     
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
        
            { document.pagado ? ( <p className="text-lime-500 font-bold pt-2 italic">Cobrado</p>) 
                : (<p className="text-mutedColor-foreground pt-2 italic">Por cobrar</p>)}

            <div className="flex justify-center gap-3 mt-4">
                <OutlineButton 
                    onClick={() => router.push(`/gestion-cobros/${document.id}`)}
                    attributes={{ title: "Ver Cobro"}}
                >
                    <EyeIcon className="size-7"/>
                </OutlineButton>

                { !document.edicom && (
                    <SecondaryButton
                        onClick={() => {
                            document.edicom = true;
                            handleClick(document)
                        }}
                        attributes={{ title: "Cargado a Edicom"}}
                    >
                        <DocumentCheckIcon className="size-7"/>
                    </SecondaryButton>
                )}

                { !document.pagado && (                    
                    <ConfirmButton
                        onClick={() => {
                            document.pagado = true;
                            handleClick(document)
                        }}
                        attributes={{ title: "Pagado"}}
                    >
                        <BanknotesIcon className="size-7 text-white"  />
                    </ConfirmButton>                    
                )}       
            </div> 
        </div>
    )
}