import CardTable from "@/src/components/cards/CardTable";

export default function GetionCobrosPage() {
    const documents = [
        {
            id: '6699c12b1f9d4e7812fa7271',
            pagado: false,
            ie: '123',
            edicom: true,
            factura: {
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
            }
        },
        {
            id: '6699c12b1f9d4e7812fa7272',
            pagado: false,
            ie: '123',
            edicom: true,
            factura: {
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
            }
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            pagado: false,
            ie: '123',
            edicom: true,
            factura: {
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
            }
        },
        {
            id: '6699c12b1f9d4e7812fa7274',
            pagado: true,
            ie: '123',
            edicom: true,
            factura: {
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
            }
        }
    ];

    return (
        <>
            <CardTable
                documents={documents}
                documentType="gestion-cobros"
            />
        </>
    )
}