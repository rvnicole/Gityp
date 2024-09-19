"use client"

import { useState, useEffect, useRef } from "react";
import CardTable from "@/src/components/cards/CardTable";
import { PrimaryButton } from "@/src/components/ui/Buttons";
import ModalAdd from "@/src/components/ui/ModalAdd";
import Link from "next/link";
import { formatDate } from "@/src/lib";
import { CardServicio, FechasDuplicadasType } from "@/src/types";
import Spinner from "@/src/components/ui/Spinner";
import { getServicios } from "@/actions/servicio-actions";
import Filters from "@/src/components/Filtros/Filters";
import { estadosServicios } from "@/src/data/data";

export default function ServiciosPage() {
    const [ searchParams, setSearchParams ] = useState({ estado: '', fecha: '' });
    const [servicios, setServicios] = useState<CardServicio []>([]);
    const [totalServicios, setTotalServicios] = useState(0);
    const [page, setPage] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const limit = 10;
   
    useEffect(() => {
        const div = ref.current!;

        const observador = new IntersectionObserver((arreglo) => {
            if(arreglo[0].isIntersecting && (totalServicios > servicios.length || page === 0)) {
                fetchServicios();
            }
        });

        observador.observe(div);        

        return () => observador.unobserve(div);
    });

    const fetchServicios = async () => {
        const {data, totalResults} = await getServicios(limit, page, searchParams) || {data: [], totalResults: 0};

        setServicios([...servicios, ...data]);
        setTotalServicios(totalResults);
        setPage( page + 1 );
    }

    const fechasDuplicadas: FechasDuplicadasType = {};
    servicios.forEach( document => fechasDuplicadas[formatDate(document.fechaEjecucion)] = fechasDuplicadas[formatDate(document.fechaEjecucion)] ? fechasDuplicadas[formatDate(document.fechaEjecucion)] + 1 : 1);

    const estadosServicioArr = Object.entries(estadosServicios);

    return (
        <div className="space-y-5">
            <div className="flex items-center flex-col md:flex-row md:justify-between gap-5">
                <Filters
                    estados={estadosServicioArr}
                    setData={setServicios}
                    setTotalData={setTotalServicios}
                    setPage={setPage}
                    setSearchParams={setSearchParams}
                />
            </div>

            <div className="flex justify-center md:justify-end">
                <Link href="/servicios?modal=create">
                    <PrimaryButton>Crear Servicio</PrimaryButton>
                </Link>
            </div>

            <CardTable
                documents={servicios}
                documentType="servicios"
                fechasDuplicadas={fechasDuplicadas}
            />

            <ModalAdd 
                documentType="servicio"
            />

            <div ref={ref} className="mx-auto">
                {totalServicios === servicios.length ? 
                    <p className="text-center text-sm text-mutedColor-foreground">Son todos los Servicios Registrados</p> 
                    : 
                    <Spinner />
                }
            </div>
        </div>
    )
}