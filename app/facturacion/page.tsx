import { connectDB } from "@/config/db";
import { Factura } from "@/model/Factura";
import CardTable from "@/src/components/cards/CardTable";
import ModalAdd from "@/src/components/ui/ModalAdd";
import { CardFacturaSchema } from "@/src/schema";

async function getFacturas(){
    await connectDB();
    const facturas = await Factura.find();
    const { success, data, error } = CardFacturaSchema.safeParse(facturas);
    if( success ){
        return data;
    }
    error.issues.forEach( issue => console.log(issue));
}

export default async function FacturacionPage() {

    const facturas = await getFacturas() || [];
    console.log('FACTURAS', facturas);

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
            <ModalAdd documentType="factura"/>
        </>
    )
}