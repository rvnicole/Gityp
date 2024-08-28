"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ConfirmButton, OutlineButton, SecondaryButton } from "../ui/Buttons";
import { BanknotesIcon, DocumentCheckIcon, EyeIcon} from "@heroicons/react/24/outline";
import type { CardCobro } from "@/src/types";

type ButtonsCobroProps = {
    document: CardCobro;
}

export default function ButtonsCobro({document }: ButtonsCobroProps) {
    const [estado, setEstado] = useState<{ edicom: CardCobro['edicom'], pagado: CardCobro['pagado'] }>({ edicom: document.edicom, pagado: document.pagado });
    const router = useRouter();

    const handleClick = ( type: string ) => {
        if( !document.edicom || !document.ie ){
            router.push(`/gestion-cobros/?documentID=${document.id}&modal=create`);
            return;
        }

        if( type === 'paid' ){
            setEstado({ ...estado, pagado: true });
        }
        else if( type === 'chageState' ){
            setEstado({ ...estado, edicom: true });
        }
    }

    return (
        <>
            { estado ? ( <p className="text-lime-500 font-bold pt-2 italic">Cobrado</p>) 
                : (<p className="text-mutedColor-foreground pt-2 italic">Por cobrar</p>)}

            <div className="flex justify-center gap-3 mt-4">
                <OutlineButton 
                    onClick={() => router.push(`/gestion-cobros/${document.id}`)}
                    attributes={{ title: "Ver Cobro"}}
                >
                    <EyeIcon className="size-7"/>
                </OutlineButton>

                { document.edicom == false && (
                    <SecondaryButton
                        onClick={() => handleClick('changeState')}
                        attributes={{ title: "Cargado a Edicom"}}
                    >
                        <DocumentCheckIcon className="size-7"/>
                    </SecondaryButton>
                )}

                { estado.pagado === false && (                    
                    <ConfirmButton
                        onClick={() => handleClick('paid')}
                        attributes={{ title: "Pagado"}}
                    >
                        <BanknotesIcon className="size-7 text-white"  />
                    </ConfirmButton>                    
                )}       
            </div>      
        </>
    )
}