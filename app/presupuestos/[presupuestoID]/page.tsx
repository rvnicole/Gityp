import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import PresupuestoDetail from "@/src/components/documentView/PresupuestoDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";

export default function PresupuestoIDPage({ params }: { params: {presupuestoID: string}}) {
    const { presupuestoID } = params;

    const presupuesto = {
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
                idConductor: 'Persona Conductora',
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
                idConductor: 'Persona Conductora',
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
                idConductor: 'Persona Conductora',
                nota: 'Ut vitae nulla hendrerit.',
                estado: 'assign'
            }
        ]
    }

    return (
        <>
            <DocumentDetail 
                documentID={presupuestoID}
            >
                <PresupuestoDetail 
                    presupuesto={presupuesto}
                />
            </DocumentDetail>

            <ModalEdit documentType="presupuesto" />
        </>
    )
}