"use client"

import { useEffect, useState, useRef } from "react";
import CardTable from "@/src/components/cards/CardTable";
import { PrimaryButton } from "@/src/components/ui/Buttons";
import ModalAdd from "@/src/components/ui/ModalAdd";
import Spinner from "@/src/components/ui/Spinner";
import { CardPresupuesto } from "@/src/types";
import Link from "next/link";
import { getPresupuestos } from "@/actions/presupuesto-actions";

export default function PresupuestoPage() {
    const [presupuestos, setPresupuestos] = useState<CardPresupuesto[]>([]);
    const [totalPresupuestos, setTotalPresupuestos] = useState(0);
    const [page, setPage] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const limit = 10;
   
    useEffect(() => {
        const div = ref.current!;

        const observador = new IntersectionObserver((arreglo) => {
            if(arreglo[0].isIntersecting) {
                fetchPresupuestos();
            }
        });

        observador.observe(div);        

        return () => observador.unobserve(div);
    });

    const fetchPresupuestos = async () => {
        const {data, totalResults} = await getPresupuestos(limit, page) || {data: [], totalResults: 0};

        setPresupuestos([...presupuestos, ...data]);
        setTotalPresupuestos(totalResults);
        setPage( page + 1 );
    }

    return (
        <div className="space-y-5">
            <div className="flex justify-center md:justify-end">
                <Link href="/presupuestos?modal=create">
                    <PrimaryButton>Crear Presupuesto</PrimaryButton>
                </Link>
            </div>

            <CardTable
                documents={presupuestos}
                documentType="presupuestos"
            />

            <ModalAdd documentType="presupuesto"/>

            <div ref={ref} className="mx-auto">
                {totalPresupuestos === presupuestos.length ? <p className="text-center text-sm text-mutedColor-foreground">Son todo los Presupuestos Registrados</p> : <Spinner />}
            </div>
        </div>
    )
}