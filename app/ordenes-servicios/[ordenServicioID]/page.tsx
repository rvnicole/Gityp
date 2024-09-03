import { connectDB } from "@/config/db";
import { OrdenServicio } from "@/model/OrdenServicio";
import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import OrdenServicioDetail from "@/src/components/documentView/OrdenServicioDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";
import { OrdenServicioSchema } from "@/src/schema";
import { OrdenServicio as OrdenServicioType } from "@/src/types";

async function getOrdenServicio(id: OrdenServicioType['id']) {
    try {
        await connectDB();

        const ordenServicio = await OrdenServicio.findById(id).populate([
            { path: 'presupuesto', select: '_id' },
            { path: 'presupuesto' },
            { path: 'servicios', populate: { path: 'idConductor' } },
            { path: 'servicios', populate: { path: 'ordenServicio'} }
        ]);

        const {success, data, error} = OrdenServicioSchema.safeParse(ordenServicio);
        
        if(success) {
            return data;
        }

        error.issues.forEach( error => console.log(error));
    }
    catch(error) {
        console.log(error);
    }
}

export default async function OrdenServicioIDPage({ params }: { params: {ordenServicioID: string}}) {
    const { ordenServicioID } = params;

    const ordenServicio = await getOrdenServicio(ordenServicioID);
    //console.log('Orden Servicio', ordenServicio);

    if(ordenServicio) return (
        <>
            <DocumentDetail 
                documentID={ordenServicioID}
            >
                <OrdenServicioDetail 
                    ordenServicio={ordenServicio}
                />
            </DocumentDetail>
            
            <ModalEdit 
                documentType="ordenServicio" 
                defaultValues={ordenServicio}
            />
        </>
    )
}