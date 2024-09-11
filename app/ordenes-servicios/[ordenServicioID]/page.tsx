import { connectDB } from "@/config/db";
import { OrdenServicio } from "@/model/OrdenServicio";
import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import OrdenServicioDetail from "@/src/components/documentView/OrdenServicioDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";
import { OrdenServicioSchema } from "@/src/schema";
import { OrdenServicio as OrdenServicioType } from "@/src/types";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

export const revalidate = 0;

async function getOrdenServicio(id: OrdenServicioType['id']) {
    try {
        await connectDB();

        if( !mongoose.Types.ObjectId.isValid(id)) {
            return 'not-found';
        }

        const ordenServicio = await OrdenServicio.findById(id).populate([
            { path: 'presupuesto' },
            { path: 'servicios', populate: [{ path: 'idConductor' }, { path: 'ordenServicio'}] }
        ]);

        if( !ordenServicio) {
            return 'not-found';
        }

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

    if(ordenServicio === 'not-found') {
        notFound();
    }

    if(ordenServicio) return (
        <>
            <DocumentDetail 
                documentID={ordenServicioID}
                documentType="ordenServicio"
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