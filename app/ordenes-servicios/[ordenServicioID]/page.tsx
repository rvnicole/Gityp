"use server"

import { connectDB } from "@/config/db";
import { OrdenServicio } from "@/model/OrdenServicio";
import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import OrdenServicioDetail from "@/src/components/documentView/OrdenServicioDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";
import { OrdenServicioSchema } from "@/src/schema";
import { OrdenServicio as OrdenServicioType } from "@/src/types";

async function getOrdenServicio(id: OrdenServicioType['id']) {
    try {
        await connectDB();

        const ordenesServicio = await OrdenServicio.findById(id).populate('presupuesto').populate('servicios');

        const result = OrdenServicioSchema.safeParse(ordenesServicio);
        
        if(result) {
            return result.data;
        };
    }
    catch(error) {
        console.log(error);
    }
}

export default async function OrdenServicioIDPage({ params }: { params: {ordenServicioID: string}}) {
    const { ordenServicioID } = params;

    const ordenServicio = await getOrdenServicio(ordenServicioID);

    const document = {
        id: '6699c12b1f9d4e7812fa7274',
        fecha: new Date(),
        proveedor: 'Pruebas',
        solicito: 'Fulanita',
        subtotal: 900,
        iva: 100,
        total: 1000,
        estado: 'assign',
        comentarios: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget. Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.', 
        ordenCompra: '123456',
        urlOrdenCompra: 'https://heroicons.com/outline',
        presupuesto: {
            id: '6699c12b1f9d4e7812fa7274',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            subtotal: 900,
            iva: 100,
            total: 1000,
            estado: 'pending',
            comentarios: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget. Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
            servicios: [
                {
                    id: '6699c12b1f9d4e7812fa7272',
                    ordenServicio: {
                        id: '6699c12b1f9d4e7812fa7271',
                        solicito: 'Fulanita',
                        urlOrdenCompra: '/ejemplo',
                        ordenCompra: '67890'
                    },
                    fechaEjecucion: new Date(),
                    descripcion: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
                    costo: 1000,
                    tipoServicio: 'paqueteria',
                    idConductor: {
                        id: 'asdasd',
                        nombre: 'Nicole',
                        apellido: 'Rosas',
                        edad: 24,
                        licencia: 'FG-009'
                    },
                    nota: 'Ut vitae nulla hendrerit.',
                    estado: 'assign'
                },
                {
                    id: '6699c12b1f9d4e7812fa7274',
                    ordenServicio: {
                        id: '6699c12b1f9d4e7812fa7271',
                        solicito: 'Fulanita',
                        urlOrdenCompra: '/ejemplo',
                        ordenCompra: '67890'
                    },
                    fechaEjecucion: new Date(),
                    descripcion: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
                    costo: 1000,
                    tipoServicio: 'paqueteria',
                    idConductor: {
                        id: 'asdasd',
                        nombre: 'Nicole',
                        apellido: 'Rosas',
                        edad: 24,
                        licencia: 'FG-009'
                    },
                    nota: 'Ut vitae nulla hendrerit.',
                    estado: 'assign'
                },
                {
                    id: '6699c12b1f9d4e7812fa7277',
                    ordenServicio: {
                        id: '6699c12b1f9d4e7812fa7271',
                        solicito: 'Fulanita',
                        urlOrdenCompra: '/ejemplo',
                        ordenCompra: '67890'
                    },
                    fechaEjecucion: new Date(),
                    descripcion: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
                    costo: 1000,
                    tipoServicio: 'paqueteria',
                    idConductor: {
                        id: 'asdasd',
                        nombre: 'Nicole',
                        apellido: 'Rosas',
                        edad: 24,
                        licencia: 'FG-009'
                    },
                    nota: 'Ut vitae nulla hendrerit.',
                    estado: 'assign'
                }
            ]
        },
        servicios: [
            {
                id: '6699c12b1f9d4e7812fa7271',
                ordenServicio: {
                    id: '6699c12b1f9d4e7812fa7271',
                    solicito: 'Fulanita',
                    urlOrdenCompra: '/ejemplo',
                    ordenCompra: '67890'
                },
                fechaEjecucion: new Date(),
                descripcion: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
                costo: 1000,
                tipoServicio: 'paqueteria',
                idConductor: {
                    id: 'asdasd',
                    nombre: 'Nicole',
                    apellido: 'Rosas',
                    edad: 24,
                    licencia: 'FG-009'
                },
                nota: 'Ut vitae nulla hendrerit.',
                estado: 'assign'
            },
            {
                id: '6699c12b1f9d4e7812fa7272',
                ordenServicio: {
                    id: '6699c12b1f9d4e7812fa7271',
                    solicito: 'Fulanita',
                    urlOrdenCompra: '/ejemplo',
                    ordenCompra: '67890'
                },
                fechaEjecucion: new Date(),
                descripcion: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
                costo: 1000,
                tipoServicio: 'paqueteria',
                idConductor: {
                    id: 'asdasd',
                    nombre: 'Nicole',
                    apellido: 'Rosas',
                    edad: 24,
                    licencia: 'FG-009'
                },
                nota: 'Ut vitae nulla hendrerit.',
                estado: 'assign'
            },
            {
                id: '6699c12b1f9d4e7812fa7275',
                ordenServicio: {
                    id: '6699c12b1f9d4e7812fa7271',
                    solicito: 'Fulanita',
                    urlOrdenCompra: '/ejemplo',
                    ordenCompra: '67890'
                },
                fechaEjecucion: new Date(),
                descripcion: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
                costo: 1000,
                tipoServicio: 'paqueteria',
                idConductor: {
                    id: 'asdasd',
                    nombre: 'Nicole',
                    apellido: 'Rosas',
                    edad: 24,
                    licencia: 'FG-009'
                },
                nota: 'Ut vitae nulla hendrerit.',
                estado: 'assign'
            }
        ]
    }

    return (
        <>
            <DocumentDetail 
                documentID={ordenServicioID}
            >
                <OrdenServicioDetail 
                    ordenServicio={document}
                />
            </DocumentDetail>
            
            <ModalEdit 
                documentType="ordenServicio" 
                defaultValues={document}
            />
        </>
    )
}