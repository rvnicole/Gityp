"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ConfirmButton, OutlineButton, SecondaryButton } from "../ui/Buttons";
import { BanknotesIcon, DocumentCheckIcon, EyeIcon} from "@heroicons/react/24/outline";
import type { CardCobro } from "@/src/types";

type ButtonsCobroProps = {
    documentID: CardCobro['id'];
    estadoDocument: CardCobro['pagado'];
    cargadoEdicom: CardCobro['edicom'];
}

export default function ButtonsCobro({documentID, estadoDocument, cargadoEdicom}: ButtonsCobroProps) {
    const [estado, setEstado] = useState<CardCobro['pagado']>(estadoDocument);
    const router = useRouter();

    const handleClickPaid = () => {
        setEstado(true);
    }

    return (
        <>
            { estado ? ( <p className="text-lime-500 font-bold pt-2 italic">Cobrado</p>) 
                : (<p className="text-mutedColor-foreground pt-2 italic">Por cobrar</p>)}

            <div className="flex justify-center gap-3 mt-4">
                <OutlineButton 
                    onClick={() => router.push(`/gestion-cobros/${documentID}`)}
                    attributes={{ title: "Ver Cobro"}}
                >
                    <EyeIcon className="size-7"/>
                </OutlineButton>

                { cargadoEdicom == false && (
                    <SecondaryButton
                        onClick={handleClickPaid}
                        attributes={{ title: "Cargado a Edicom"}}
                    >
                        <DocumentCheckIcon className="size-7"/>
                    </SecondaryButton>
                )}

                { estado === false && (                    
                    <ConfirmButton
                        onClick={handleClickPaid}
                        attributes={{ title: "Pagado"}}
                    >
                        <BanknotesIcon className="size-7 text-white"  />
                    </ConfirmButton>                    
                )}       
            </div>      
        </>
    )
}