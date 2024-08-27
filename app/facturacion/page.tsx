import CardTable from "@/src/components/cards/CardTable";
import ModalAdd from "@/src/components/ui/ModalAdd";

export default function FacturacionPage() {
    const documents = [
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'notsealed'
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'notsealed'
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'notsealed'
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            ordenCompra: '67890',
            total: 1000,
            estado: 'notsealed'
        }
    ];

    return (
        <>
            <CardTable
                documents={documents}
                documentType="facturacion"
                documentTitle="Factura"
            />
            <ModalAdd documentType="factura"/>
        </>
    )
}