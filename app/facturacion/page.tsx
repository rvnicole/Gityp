"use client"

import { getFacturas } from "@/actions/factura-actions";
import CardTable from "@/src/components/cards/CardTable";
import ModalAdd from "@/src/components/ui/ModalAdd";
import Spinner from "@/src/components/ui/Spinner";
import { CardFactura } from "@/src/types";
import { useEffect, useRef, useState } from "react";

export default function FacturacionPage() {
    const [facturas, setFacturas] = useState<CardFactura[]>([]);
    const [totalFacturas, setTotalFacturas] = useState(0);
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
        const {data, totalResults} = await getFacturas(limit, page) || {data: [], totalResults: 0};

        setFacturas([...facturas, ...data]);
        setTotalFacturas(totalResults);
        setPage( page + 1 );
    }

    return (
        <>
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