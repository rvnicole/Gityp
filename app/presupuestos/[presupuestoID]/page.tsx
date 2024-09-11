import { connectDB } from "@/config/db";
import { Presupuesto } from "@/model/Presupuesto";
import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import PresupuestoDetail from "@/src/components/documentView/PresupuestoDetail";
import Modal from "@/src/components/ui/Modal";
import ModalEdit from "@/src/components/ui/ModalEdit";
import ModalSend from "@/src/components/ui/ModalSend";
import { PresupuestoSchema } from "@/src/schema";
import { Presupuesto as PresupuestoType } from "@/src/types";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

export const revalidate = 0;

async function getPresupuestoById(id: PresupuestoType['id']){
    try{
        await connectDB();

        if( !mongoose.Types.ObjectId.isValid(id)) {
            return 'not-found';
        }

        const presupuesto = await Presupuesto.findById(id).populate('servicios').populate({
            path: 'servicios',
            populate: [
                { path: 'idConductor' },
                { path: 'ordenServicio' }
            ]
        });

        if( !presupuesto) {
            return 'not-found';
        }
        
        const { success, data, error } = PresupuestoSchema.safeParse(presupuesto);
        if( success ){
            return data;
        };
        error.issues.forEach( issue => console.log(issue));
    }
    catch(error){
        console.log(error);
    }
};

export default async function PresupuestoIDPage({ params }: { params: {presupuestoID: string}}) {
    const { presupuestoID } = params;

    const presupuesto = await getPresupuestoById(presupuestoID);

    if(presupuesto === 'not-found') {
        notFound();
    }

    if(presupuesto) return (
        <>
            <DocumentDetail 
                documentID={presupuestoID}
                documentType="presupuesto"
            >
                <PresupuestoDetail 
                    presupuesto={presupuesto}
                />
            </DocumentDetail>

            {
                presupuesto.estado === 'pending' ? 
                    <ModalEdit 
                        documentType="presupuesto" 
                        defaultValues={presupuesto}
                    />
                :
                    <Modal>No se puede editar un presupuesto que ya ha sido aprobado o rechazado</Modal>
            }
            <ModalSend>Estes es para enviar</ModalSend>
        </>
    )
}