"use client"

import { getFacturas } from "@/actions/factura-actions";
import CardTable from "@/src/components/cards/CardTable";
import Filters from "@/src/components/Filtros/Filters";
import ModalAdd from "@/src/components/ui/ModalAdd";
import Spinner from "@/src/components/ui/Spinner";
import { estadosFactura } from "@/src/data/data";
import { CardFactura } from "@/src/types";
import { useEffect, useRef, useState } from "react";

export default function FacturacionPage() {
    const [ searchParams, setSearchParams ] = useState({ estado: '', fecha: '' });
    const [facturas, setFacturas] = useState<CardFactura[]>([]);
    const [totalFacturas, setTotalFacturas] = useState(0);
    const [page, setPage] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const limit = 10;
   
    useEffect(() => {
        const div = ref.current!;

        const observador = new IntersectionObserver((arreglo) => {
            if(arreglo[0].isIntersecting && (totalFacturas > facturas.length || page === 0 )) {
                fetchFacturas();
            }
        });

        observador.observe(div);        

        return () => observador.unobserve(div);
    });

    const fetchFacturas = async () => {
        const {data, totalResults} = await getFacturas(limit, page, searchParams) || {data: [], totalResults: 0};

        setFacturas([...facturas, ...data]);
        setTotalFacturas(totalResults);
        setPage( page + 1 );
    }

    const estadosFacturasArr = Object.entries(estadosFactura);

    return (
        <>
            <div className="flex items-center flex-col md:flex-row md:justify-between gap-5">
                <Filters
                    estados={estadosFacturasArr}
                    setData={setFacturas}
                    setTotalData={setTotalFacturas}
                    setPage={setPage}
                    setSearchParams={setSearchParams}
                />
            </div>
            <CardTable
                documents={facturas}
                documentType="facturacion"
            />
            <ModalAdd documentType="factura"/>
            <div ref={ref} className="mx-auto">
                {totalFacturas === facturas.length ? <p className="text-center text-sm text-mutedColor-foreground">Son todas las Facturas Registradas</p> : <Spinner />}
            </div>
        </>
    )
}