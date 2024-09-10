"use client"

import { useState, useRef, useEffect } from "react";
import { getOrdenesServicio } from "@/actions/orden-servicio-actions";
import CardTable from "@/src/components/cards/CardTable";
import Spinner from "@/src/components/ui/Spinner";
import { CardOrdenServicio } from "@/src/types";

export default function OrdenesServiciosPage() {
    const [ordenesServicios, setOrdenesServicios] = useState<CardOrdenServicio []>([]);
    const [totalOrdenesServicios, setTotalOrdenesServicios] = useState(0);
    const [page, setPage] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const limit = 10;
   
    useEffect(() => {
        const div = ref.current!;

        const observador = new IntersectionObserver((arreglo) => {
            if(arreglo[0].isIntersecting && (totalOrdenesServicios > ordenesServicios.length || page === 0)) {
                fetchOrdenesServicios();
            }
        });

        observador.observe(div);        

        return () => observador.unobserve(div);
    });

    const fetchOrdenesServicios = async () => {
        const {data, totalResults} = await getOrdenesServicio(limit, page) || {data: [], totalResults: 0};

        setOrdenesServicios([...ordenesServicios, ...data]);
        setTotalOrdenesServicios(totalResults);
        setPage( page + 1 );
    }

    return (
        <>
            <CardTable
                documents={ordenesServicios}
                documentType="ordenes-servicios"
            />

            <div ref={ref} className="mx-auto">
                {totalOrdenesServicios === ordenesServicios.length ? 
                    <p className="text-center text-sm text-mutedColor-foreground">Son todas las Ordenes de Servicio Registradas</p> 
                    : 
                    <Spinner />
                }
            </div>
        </>
    )
}