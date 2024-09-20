"use client"

import { useEffect, useState, useRef, Suspense } from "react";
import CardTable from "@/src/components/cards/CardTable";
import { PrimaryButton } from "@/src/components/ui/Buttons";
import ModalAdd from "@/src/components/ui/ModalAdd";
import Spinner from "@/src/components/ui/Spinner";
import { CardPresupuesto } from "@/src/types";
import Link from "next/link";
import { getPresupuestos } from "@/actions/presupuesto-actions";
import Filters from "@/src/components/Filtros/Filters";
import { estadosPresupuesto } from "@/src/data/data";

export default function PresupuestoPage() {
    const [ searchParams, setSearchParams ] = useState({ estado: '', fecha: '' });
    const [presupuestos, setPresupuestos] = useState<CardPresupuesto[]>([]);
    const [totalPresupuestos, setTotalPresupuestos] = useState(0);
    const [page, setPage] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const limit = 10;
   
    useEffect(() => {
        
        const div = ref.current!;
        if(div){
            const observador = new IntersectionObserver((arreglo) => {
                if(arreglo[0].isIntersecting && (totalPresupuestos > presupuestos.length || page === 0) ) {
                    fetchPresupuestos();
                }
            });

            observador.observe(div);        

            return () => observador.unobserve(div);
        };
    });

    const fetchPresupuestos = async () => {
        const {data, totalResults} = await getPresupuestos(limit, page, searchParams) || {data: [], totalResults: 0};
        console.log({ data, mensaje:'datos' });
        setPresupuestos([...presupuestos, ...data]);
        setTotalPresupuestos(totalResults);
        setPage( page + 1 );
    }

    const estadosPresupuestoArr = Object.entries(estadosPresupuesto);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="space-y-5">
                    <div className="flex items-center flex-col md:flex-row md:justify-between gap-5">
                        <Filters 
                            estados={estadosPresupuestoArr}
                            setData={setPresupuestos}
                            setTotalData={setTotalPresupuestos}
                            setPage={setPage}
                            setSearchParams={setSearchParams}
                        />
                        <div className="flex justify-center md:justify-end">
                            <Link href="/presupuestos?modal=create">
                                <PrimaryButton>Crear Presupuesto</PrimaryButton>
                            </Link>
                        </div>
                    </div>

                    <CardTable
                        documents={presupuestos}
                        documentType="presupuestos"
                    />

                    <ModalAdd documentType="presupuesto"/>
                </div>
            </Suspense>
            <div ref={ref} className="mx-auto">
                {totalPresupuestos === presupuestos.length ? <p className="text-center text-sm text-mutedColor-foreground">Son todo los Presupuestos Registrados</p> : <Spinner />}
            </div>
        </>
    )
}