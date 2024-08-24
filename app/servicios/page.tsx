import CardTable from "@/src/components/cards/CardTable";

export default function ServiciosPage() {
    const documents = [
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
    ];

    return (
        <>
            <CardTable
                documents={documents}
                documentType="servicios"
                documentTitle="Servicio"
            />
        </>
    )
}