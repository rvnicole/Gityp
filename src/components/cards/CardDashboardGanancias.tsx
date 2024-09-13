"use client"

import { useEffect, useState } from "react";
import { SelectMonth, SelectYear } from "../ui/Selects";

type CardDashboardGananciasProps = {
};

export default function CardDashboardGanancias({}: CardDashboardGananciasProps) {
    const [filtros, setFiltros] = useState<{mes: string, anio:string}>({mes: '', anio: new Date().getFullYear().toString()});

    useEffect(() => {
        console.log(filtros);
    }, [filtros]);

    return (
        <div 
            className="p-6 bg-backgroundColor border border-borderColor rounded-xl"
        >
            <div className="flex justify-between">
                <h3 className="text-mutedColor-foreground text-2xl font-bold">Ganancias</h3>

                <div className="flex gap-6">
                    <SelectMonth onChange={(event) => setFiltros({...filtros, mes: event!.target.value})}/>
                    <SelectYear onChange={(event) => setFiltros({...filtros, anio: event!.target.value})}/>
                </div>
            </div>

            <div className="flex justify-around mt-8 text-center">
                <div>
                    <p className="text-secondaryColor-foreground text-4xl font-bold">$100,000.00</p>
                    <p className="text-mutedColor-foreground font-semibold mt-2">Facturado</p>
                </div>

                <div>
                    <p className="text-secondaryColor-foreground text-4xl font-bold">$100,000.00</p>
                    <p className="text-mutedColor-foreground font-semibold mt-2">Pagado</p>
                </div>

                <div>
                    <p className="text-secondaryColor-foreground text-4xl font-bold">$100,000.00</p>
                    <p className="text-mutedColor-foreground font-semibold mt-2">Por pagar</p>
                </div>
            </div>
        </div>
    )
}