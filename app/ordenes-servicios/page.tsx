import CardTable from "@/src/components/cards/CardTable";

export default function OrdenesServiciosPage() {
    const documents = [
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            total: 1000,
            estado: 'pending'
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            total: 1000,
            estado: 'pending'
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            total: 1000,
            estado: 'pending'
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            total: 1000,
            estado: 'pending'
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