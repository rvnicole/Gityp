"use client"

import type { CardCobro } from "@/src/types";
import { useRouter } from "next/navigation";
import { ConfirmButton, OutlineButton, SecondaryButton } from "../ui/Buttons";
import { BanknotesIcon, DocumentCheckIcon, EyeIcon} from "@heroicons/react/24/outline";
import { updateEstadoCobro } from "@/actions/gestion-cobros-actions";
import { toast } from "react-toastify";
import { useState } from "react";

type ContentCobroProps = {
    document: CardCobro;
}

export default function ButtonsCobro({document}: ContentCobroProps) {
    const [estado, setEstado] = useState(false);
    const router = useRouter();

    const handleClick = async (document: CardCobro) => {
        if( !document.edicom || !document.ie ){
            router.push(`/gestion-cobros/?documentID=${document.id}&modal=create&pagado=${document.pagado}`);
            return;
        }

        const respuesta = await updateEstadoCobro({id: document.id, pagado: document.pagado});
        
        if( respuesta.success ){
            toast.success(respuesta.message as string);
            setEstado(document.pagado);
        }
        else {
            toast.error(respuesta.message as string);
        }

        //setTimeout(()=>location.href = location.pathname, 2000);
    }
    
    return (
        <>      
            { document.pagado || estado ? ( <p className="text-lime-500 font-bold pt-2 italic">Cobrado</p>) 
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
                            //document.edicom = true;
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
        </>
    )
}