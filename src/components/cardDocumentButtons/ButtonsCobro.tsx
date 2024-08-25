"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ConfirmButton, OutlineButton } from "../ui/Buttons";
import { BanknotesIcon, EyeIcon} from "@heroicons/react/24/outline";
import { estadosCobro } from "@/src/data/data";
import type { CardDocumentInfo, EstadoCobro } from "@/src/types";

type ButtonsCobroProps = {
    documentID: CardDocumentInfo['id'];
    estadoDocument: EstadoCobro;
}

export default function ButtonsCobro({documentID, estadoDocument}: ButtonsCobroProps) {
    const [estado, setEstado] = useState<EstadoCobro>(estadoDocument);
    const router = useRouter();

    const handleClickPaid = () => {
        setEstado('paid');
    }

    return (
        <>
            <p className={`${estado === "paid" ? "text-lime-500 font-bold" : "text-mutedColor-foreground"} pt-2 italic`}>
                {estadosCobro[estado]}
            </p>

            <div className="flex justify-center gap-3 mt-4">
                <OutlineButton 
                    onClick={() => router.push(`/gestion-cobros/${documentID}`)}
                    attributes={{ title: "Ver Cobro"}}
                >
                    <EyeIcon className="size-7"/>
                </OutlineButton>

                { estado === "pending" && (
                    <>
                        <ConfirmButton
                            onClick={handleClickPaid}
                            attributes={{ title: "Pagado"}}
                        >
                            <BanknotesIcon className="size-7 text-white"  />
                        </ConfirmButton>
                    </>
                )}       
            </div>      
        </>
    )
}