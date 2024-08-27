import CardTable from "@/src/components/cards/CardTable";
import { PrimaryButton } from "@/src/components/ui/Buttons";
import ModalAdd from "@/src/components/ui/ModalAdd";
import Link from "next/link";
import { formatDate } from "@/src/lib";
import { FechasDuplicadasType } from "@/src/types";

const documents = [
    {
        id: '6699c12b1f9d4e78128a7272',
        ordenServicio: {
            id: '6699c12b1f9d4e7812fa7271',
            solicito: 'Fulanita',
            urlOrdenCompra: '/ejemplo',
            ordenCompra: '67890',
            proveedor: '1233'
        },
        fechaEjecucion: new Date('2024/02/08'),
        costo: 1000,
        tipoServicio: 'paqueteria',
        idConductor: 'Persona Conductora',
        estado: 'assign'
    },
    {
        id: '6699c12b1f9d4e7812fa5272',
        ordenServicio: {
            id: '6699c12b1f9d4e7812fa7271',
            solicito: 'Fulanita',
            urlOrdenCompra: '/ejemplo',
            ordenCompra: '67890',
            proveedor: '1233'
        },
        fechaEjecucion: new Date('2024/02/08'),
        costo: 1000,
        tipoServicio: 'paqueteria',
        idConductor: 'Persona Conductora',
        estado: 'assign'
    },
    {
        id: '6699c12b1f9d4e7812fa7275',
        ordenServicio: {
            id: '6699c12b1f9d4e7812fa7271',
            solicito: 'Fulanita',
            urlOrdenCompra: '/ejemplo',
            ordenCompra: '67890',
            proveedor: '1233'
        },
        fechaEjecucion: new Date(),
        costo: 1000,
        tipoServicio: 'paqueteria',
        idConductor: 'Persona Conductora',
        estado: 'assign'
    },
    {
        id: '6699c12b1f9d4e7812fa7273',
        ordenServicio: {
            id: '6699c12b1f9d4e7812fa7271',
            solicito: 'Fulanita',
            urlOrdenCompra: '/ejemplo',
            ordenCompra: '67890',
            proveedor: '1233'
        },
        fechaEjecucion: new Date(),
        costo: 1000,
        tipoServicio: 'paqueteria',
        idConductor: 'Persona Conductora',
        estado: 'assign'
    },
    {
        id: '6699c12b1f9d4e7812fa7271',
        ordenServicio: {
            id: '6699c12b1f9d4e7812fa7271',
            solicito: 'Fulanita',
            urlOrdenCompra: '/ejemplo',
            ordenCompra: '67890',
            proveedor: '1233'
        },
        fechaEjecucion: new Date(),
        costo: 1000,
        tipoServicio: 'paqueteria',
        idConductor: 'Persona Conductora',
        estado: 'assign'
    },
    {
        id: '6699c12b1f9d4e7812fa7270',
        ordenServicio: {
            id: '6699c12b1f9d4e7812fa7271',
            solicito: 'Fulanita',
            urlOrdenCompra: '/ejemplo',
            ordenCompra: '67890',
            proveedor: '1233'
        },
        fechaEjecucion: new Date('2023/01/03'),
        costo: 1000,
        tipoServicio: 'paqueteria',
        idConductor: 'Persona Conductora',
        estado: 'assign'
    },
    {
        id: '6699c12b1f9d4e7812fa7279',
        ordenServicio: {
            id: '6699c12b1f9d4e7812fa7271',
            solicito: 'Fulanita',
            urlOrdenCompra: '/ejemplo',
            ordenCompra: '67890',
            proveedor: '1233'
        },
        fechaEjecucion: new Date('2023/01/03'),
        costo: 1000,
        tipoServicio: 'paqueteria',
        idConductor: 'Persona Conductora',
        estado: 'assign'
    },
    {
        id: '6699c12b1f9d4e7812fa7278',
        ordenServicio: {
            id: '6699c12b1f9d4e7812fa7271',
            solicito: 'Fulanita',
            urlOrdenCompra: '/ejemplo',
            ordenCompra: '67890',
            proveedor: '1233'
        },
        fechaEjecucion: new Date('2023/01/03'),
        costo: 1000,
        tipoServicio: 'paqueteria',
        idConductor: 'Persona Conductora',
        estado: 'assign'
    },
    {
        id: '6699c12b1f9d4e7812fa7274',
        ordenServicio: {
            id: '6699c12b1f9d4e7812fa7271',
            solicito: 'Fulanita',
            urlOrdenCompra: '/ejemplo',
            ordenCompra: '67890',
            proveedor: '1233'
        },
        fechaEjecucion: new Date('2023/01/03'),
        costo: 1000,
        tipoServicio: 'paqueteria',
        idConductor: 'Persona Conductora',
        estado: 'assign'
    }
];



export default function ServiciosPage() {
    const fechasDuplicadas: FechasDuplicadasType = {};
    documents.forEach( document => fechasDuplicadas[formatDate(document.fechaEjecucion)] = fechasDuplicadas[formatDate(document.fechaEjecucion)] ? fechasDuplicadas[formatDate(document.fechaEjecucion)] + 1 : 1);

    return (
        <div className="space-y-5">
            <div className="flex justify-center md:justify-end">
                <Link href="/servicios?modal=create">
                    <PrimaryButton>Crear Servicio</PrimaryButton>
                </Link>
            </div>
            <CardTable
                documents={documents}
                documentType="servicios"
                fechasDuplicadas={fechasDuplicadas}
            />
            <ModalAdd documentType="servicio"/>
        </div>
    )
}