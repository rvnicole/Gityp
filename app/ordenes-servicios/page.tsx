"use client"

import { useState, useRef, useEffect } from "react";
import { getOrdenesServicio } from "@/actions/orden-servicio-actions";
import CardTable from "@/src/components/cards/CardTable";
import Spinner from "@/src/components/ui/Spinner";
import { CardOrdenServicio } from "@/src/types";
import { estadosOrdenServicio } from "@/src/data/data";
import Filters from "@/src/components/Filtros/Filters";

export default function OrdenesServiciosPage() {
    const [ searchParams, setSearchParams ] = useState({ estado: '', fecha: '' });
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
        const {data, totalResults} = await getOrdenesServicio(limit, page, searchParams) || {data: [], totalResults: 0};

        setOrdenesServicios([...ordenesServicios, ...data]);
        setTotalOrdenesServicios(totalResults);
        setPage( page + 1 );
    }

    const estadosOSArr = Object.entries(estadosOrdenServicio);

    return (
        <>
            <Filters 
                estados={estadosOSArr}
                setData={setOrdenesServicios}
                setTotalData={setTotalOrdenesServicios}
                setPage={setPage}
                setSearchParams={setSearchParams}
            />
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