import { connectDB } from "@/config/db";
import { Factura } from "@/model/Factura";
import CardTable from "@/src/components/cards/CardTable";
import ModalAdd from "@/src/components/ui/ModalAdd";
import { CardFacturasSchema } from "@/src/schema";

async function getFacturas(){
    await connectDB();
    const facturas = await Factura.find()
                                    .populate({ path: 'ordenServicio' })
                                    .populate({ path: 'ordenServicio', populate: [
                                        { path: 'servicios' },
                                        { path: 'servicios', populate: [
                                            { path: 'idConductor' },
                                            { path: 'ordenServicio', select: 'id solicito urlOrdenCompra ordenCompra' }
                                        ]}
                                    ]}).sort({ fecha: -1 });
                                    
    const { success, data, error } = CardFacturasSchema.safeParse(facturas);
    if( success ){
        return data;
    }
    error.issues.forEach( issue => console.log(issue));
}

export default async function FacturacionPage() {

    const facturas = await getFacturas() || [];

    return (
        <>
            <CardTable
                documents={facturas}
                documentType="facturacion"
            />
            <ModalAdd documentType="factura"/>
        </>
    )
}