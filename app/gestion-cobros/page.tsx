import CardTable from "@/src/components/cards/CardTable";

export default function GetionCobrosPage() {
    const documents = [
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'pending'
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'pending'
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'pending'
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'pending'
        }
    ];

    return (
        <>
            <CardTable
                documents={documents}
                documentType="gestion-cobros"
                documentTitle="Cobro"
            />
        </>
    )
}