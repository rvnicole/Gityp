"use client"
import { getCobros } from "@/actions/gestion-cobros-actions";
import CardTable from "@/src/components/cards/CardTable";
import Filters from "@/src/components/Filtros/Filters";
import ModalAdd from "@/src/components/ui/ModalAdd";
import Spinner from "@/src/components/ui/Spinner";
import { estadosCobro } from "@/src/data/data";
import { CardCobro } from "@/src/types";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function GetionCobrosPage() {
    const [ searchParams, setSearchParams ] = useState({ estado: '', fecha: '' });
    const [cobros, setCobros] = useState<CardCobro[]>([]);
    const [totalCobros, setTotalCobros] = useState(0);
    const [page, setPage] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const limit = 10;
   
    useEffect(() => {
        const div = ref.current!;

        const observador = new IntersectionObserver((arreglo) => {
            if(arreglo[0].isIntersecting && (totalCobros > cobros.length || page === 0)) {
                fetchGestionCobros();
            }
        });

        observador.observe(div);        

        return () => observador.unobserve(div);
    });

    const fetchGestionCobros = async () => {
        const {data, totalResults} = await getCobros(limit, page, searchParams) || {data: [], totalResults: 0};

        setCobros([...cobros, ...data]);
        setTotalCobros(totalResults);
        setPage( page + 1 );
    }

    //const estadosCobrossArr = Object.entries(estadosCobro);
    const estadosCobroArr = [['pagado', 'Pagado'],['pendiente', 'Pendiente'],['edicom', 'Cargado a Edicom'],['noEdicom','Sin Cargar a Edicom']]
   // console.log(estadosCobrossArr);

    return (
        <>
            <Filters
                estados={estadosCobroArr}
                setData={setCobros}
                setTotalData={setTotalCobros}
                setPage={setPage}
                setSearchParams={setSearchParams}
            />

            <CardTable
                documents={cobros}
                documentType="gestion-cobros"
            />

            <ModalAdd documentType="gestionCobro" />
            <div ref={ref} className="mx-auto">
                {totalCobros === cobros.length ? <p className="text-center text-sm text-mutedColor-foreground">Son todos las Cobros Registrados</p> : <Spinner />}
            </div>
            <ToastContainer />
        </>
    )
}