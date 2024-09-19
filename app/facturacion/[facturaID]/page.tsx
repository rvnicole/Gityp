import { connectDB } from "@/config/db";
import { Factura } from "@/model/Factura";
import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import FacturaDetail from "@/src/components/documentView/FacturaDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";
import { FacturaSchema } from "@/src/schema";
import { Factura as FacturaType } from "@/src/types";
import { ToastContainer } from "react-toastify";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

export const revalidate = 0;

async function getFacturaById(id: FacturaType['id']){
    try {
        await connectDB();

        if( !mongoose.Types.ObjectId.isValid(id!)) {
            return 'not-found';
        }

        const factura = await Factura.findById(id).populate([
            { path: 'emisor' },
            { path: 'receptor' },
            { path: 'ordenServicio'},
            { path: 'ordenServicio', populate: [
                { path: 'presupuesto', select: 'id' },
                { path: 'servicios' },
                { path: 'servicios', populate: [
                    { path: 'ordenServicio', select: 'id solicito urlOrdenCompra ordenCompra' },
                    { path: 'idConductor', select: 'nombre apellido'}
                ]}
            ]}
        ]);

        if( !factura ) {
            return 'not-found';
        }
                                                
        const { success, data, error } = FacturaSchema.safeParse(factura);
        if( success ){
            return data;
        };
        error.issues.forEach( issue => console.log(issue) );
    }
    catch(error) {
        console.log(error);
    }
};

export default async function FacturaIDPage({ params }: { params: {facturaID: string}}) {
    const { facturaID } = params;
    const factura = await getFacturaById(facturaID);

    if(factura === 'not-found') {
        notFound();
    }

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
            <ToastContainer />
        </>
    )
}