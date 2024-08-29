import { connectDB } from "@/config/db";
import { Presupuesto } from "@/model/Presupuesto";
import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import PresupuestoDetail from "@/src/components/documentView/PresupuestoDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";
import { PresupuestoSchema } from "@/src/schema";
import { Presupuesto as PresupuestoType } from "@/src/types";

async function getPresupuestoById(id: PresupuestoType['id']){
    try{
        await connectDB();
        const presupuesto = await Presupuesto.findById(id)
                                                    .populate('servicios')
                                                    .populate({ path: 'servicios', populate: 'idConductor' });
        console.log(presupuesto);
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

    if(presupuesto) return (
        <>
            <DocumentDetail 
                documentID={presupuestoID}
            >
                <PresupuestoDetail 
                    presupuesto={presupuesto}
                />
            </DocumentDetail>

            <ModalEdit 
                documentType="presupuesto" 
                defaultValues={presupuesto}
            />
        </>
    )
}