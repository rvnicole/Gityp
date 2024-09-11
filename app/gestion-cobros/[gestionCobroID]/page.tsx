import { connectDB } from "@/config/db";
import { GestionCobro } from "@/model/GestionCobro";
import CobroDetail from "@/src/components/documentView/CobroDetail";
import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";
import { GestionCobrosSchema } from "@/src/schema";
import { GestionCobros } from "@/src/types";
import { ToastContainer } from "react-toastify";

async function getCobro(id: GestionCobros['id']) {
    try {
        await connectDB();

        const cobro = await GestionCobro.findById(id).populate([
            { path: 'factura', populate: [
                { path: 'emisor'},
                { path: 'receptor'},
                { path: 'ordenServicio', populate: [
                    { path: 'presupuesto', select: 'id' },
                    { path: 'servicios', populate: [
                        { path: 'idConductor'}, 
                        { path: 'ordenServicio', select: 'id solicito urlOrdenCompra ordenCompra'}
                    ]},
                ]}
            ]}
        ]);
        
        const {success, data, error} = GestionCobrosSchema.safeParse(cobro);
        
        if(success) {
            return data;
        }

        error.issues.forEach( error => console.log(error));
    }
    catch(error) {
        console.log(error);
    }
}

export default async function GestionCobroIDPage({ params }: { params: {gestionCobroID: string}}) {
    const { gestionCobroID } = params;

    const cobro = await getCobro( gestionCobroID );
    console.log("Cobro", cobro);

    if(cobro) return (
        <>
            <DocumentDetail 
                documentID={gestionCobroID}
            >
                <CobroDetail 
                    cobro={cobro}
                />
            </DocumentDetail>
            
            <ModalEdit 
                documentType="gestionCobro" 
                defaultValues={cobro}
            />
            <ToastContainer />
        </>
    )
}