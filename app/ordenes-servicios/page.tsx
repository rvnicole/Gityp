"use server"

import { connectDB } from "@/config/db";
import { OrdenServicio } from "@/model/OrdenServicio";
import CardTable from "@/src/components/cards/CardTable";
import { CardsOrdenServicioSchema } from "@/src/schema";

async function getOrdenesServicio() {
    try {
        await connectDB();

        const ordenesServicio = await OrdenServicio.find();
        const result = CardsOrdenServicioSchema.safeParse(ordenesServicio);
        
        if(result) {
            return result.data;
        };
    }
    catch(error) {
        console.log(error);
    }
}

export default async function OrdenesServiciosPage() {
    const documents = [
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'assign'
        },
        {
            id: '6699c12b1f9d4e7812fa7274',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'inProgress'
        },
        {
            id: '6699c12b1f9d4e7812fa7275',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'complete'
        },
        {
            id: '6699c12b1f9d4e7812fa7276',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'inProgress'
        }
    ];
    const ordenesServicios = await getOrdenesServicio() || [];

    return (
        <>
            <CardTable
                documents={documents}
                documentType="ordenes-servicios"
            />
        </>
    )
}