
import { connectDB } from "@/config/db";
import { Factura } from "@/model/Factura";
import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import FacturaDetail from "@/src/components/documentView/FacturaDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";
import { FacturaSchema } from "@/src/schema";
import { Factura as FacturaType } from "@/src/types";

async function getFacturaById(id: FacturaType['id']){
    await connectDB();
    const factura = await Factura.findById(id)
                                        .populate([
                                            { path: 'emisor' },
                                            { path: 'receptor' },
                                            { path: 'ordenServicio'},
                                            { path: 'ordenServicio', populate: [
                                                { path: 'presupuesto', select: 'id' },
                                                { path: 'servicios' },
                                                { path: 'servicios', populate: [
                                                    { path: 'ordenServicio', select: 'id solicito urlCompra ordenCompra' },
                                                    { path: 'idConductor', select: 'nombre apellido'}
                                                ]}
                                            ]}
                                        ]);
                                            
    const { success, data, error } = FacturaSchema.safeParse(factura);
    if( success ){
        return data;
    };
    error.issues.forEach( issue => console.log(issue) );
};

export default async function FacturaIDPage({ params }: { params: {facturaID: string}}) {
    const { facturaID } = params;
    const factura = await getFacturaById(facturaID);


    if(factura) return (
        <>
            <DocumentDetail 
                documentID={facturaID}
            >
                <FacturaDetail 
                    factura={factura}
                />
            </DocumentDetail>
            
            <ModalEdit 
                documentType="factura" 
                defaultValues={factura}
            />
        </>
    )
}