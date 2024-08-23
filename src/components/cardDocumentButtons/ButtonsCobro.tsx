"use client"

import { useState } from "react";
import { ConfirmButton } from "../ui/Buttons";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { estadosCobro } from "@/src/data/data";
import type { EstadoCobro } from "@/src/types";

type ButtonsCobroProps = {
    estadoDocument: EstadoCobro;
}

export default function ButtonsCobro({ estadoDocument }: ButtonsCobroProps) {
    const [estado, setEstado] = useState<EstadoCobro>(estadoDocument);

    const handleClickPaid = () => {
        setEstado('paid');
    }

    return (
        <>
            <p className={`${estado === "paid" ? "text-lime-500 font-bold" : "text-mutedColor-foreground"} pt-2 italic`}>
                {estadosCobro[estado]}
            </p>

            { estado === "pending" && (
                <div className="flex justify-center gap-3 mt-4">
                    <ConfirmButton
                        onClick={handleClickPaid}
                    >
                        <BanknotesIcon className="size-7 text-white"  />
                    </ConfirmButton>
                </div>
            )}             
        </>
    )
}