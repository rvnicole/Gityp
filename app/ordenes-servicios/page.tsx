import CardTable from "@/src/components/cards/CardTable";

export default function OrdenesServiciosPage() {
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
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'inProgress'
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'complete'
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'unrealized'
        }
    ];

    return (
        <>
            <CardTable
                documents={documents}
                documentType="ordenes-servicios"
                documentTitle="Ordenen de Servicio"
            />
        </>
    )
}