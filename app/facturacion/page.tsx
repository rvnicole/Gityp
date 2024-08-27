import CardTable from "@/src/components/cards/CardTable";

export default function FacturacionPage() {
    const documents = [
        {
            id: '6699c12b1f9d4e7812fa7271',
            fecha: new Date(),
            folio: '1000',
            estado: 'notsealed',
            ordenServicio: {
                id: '6699c12b1f9d4e7812fa7271',
                solicito: 'Fulanita',
                proveedor: 'Pruebas',
                ordenCompra: '67890',
                total: 100
            }
        },
        {
            id: '6699c12b1f9d4e7812fa7272',
            fecha: new Date(),
            folio: '1000',
            estado: 'notsealed',
            ordenServicio: {
                id: '6699c12b1f9d4e7812fa7271',
                solicito: 'Fulanita',
                proveedor: 'Pruebas',
                ordenCompra: '67890',
                total: 100
            }
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            folio: '1000',
            estado: 'notsealed',
            ordenServicio: {
                id: '6699c12b1f9d4e7812fa7271',
                solicito: 'Fulanita',
                proveedor: 'Pruebas',
                ordenCompra: '67890',
                total: 100
            }
        },
        {
            id: '6699c12b1f9d4e7812fa7274',
            fecha: new Date(),
            folio: '1000',
            estado: 'notsealed',
            ordenServicio: {
                id: '6699c12b1f9d4e7812fa7271',
                solicito: 'Fulanita',
                proveedor: 'Pruebas',
                ordenCompra: '67890',
                total: 100
            }
        }
    ];

    return (
        <>
            <CardTable
                documents={documents}
                documentType="facturacion"
            />
        </>
    )
}