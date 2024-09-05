import { connectDB } from "@/config/db";
import { Servicio } from "@/model/Servicio";
import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import ServicioDetail from "@/src/components/documentView/ServicioDetail";
import Modal from "@/src/components/ui/Modal";
import ModalEdit from "@/src/components/ui/ModalEdit";
import { ServicioSchema } from "@/src/schema";
import { ServiceFormData, Servicio as ServicioType} from "@/src/types";

export const revalidate = 0;

async function getServicio(id: ServicioType['id']) {
    try {
        await connectDB();

        const servicio = await Servicio.findById(id).populate([
            { path: 'idConductor' },
            { path: 'ordenServicio'}
        ]);

        const {success, data, error} = ServicioSchema.safeParse(servicio);
        
        if(success) {
            return data;
        }

        error.issues.forEach( error => console.log(error));
    }
    catch(error) {
        console.log(error);
    }
}

export default async function ServicioIDPage({ params }: { params: {servicioID: string}}) {
    const { servicioID } = params;

    const servicio = await getServicio(servicioID);

    if(servicio) return (
        <>
            <DocumentDetail 
                documentID={servicioID}
            >
                <ServicioDetail servicio={servicio} />
            </DocumentDetail>
            <ModalEdit 
                documentType="servicio" 
                defaultValues={servicio}
            />
            
            {
                servicio.estado === 'assign' || servicio.estado === 'inProgress' ? 
                    <ModalEdit 
                        documentType="servicio" 
                        defaultValues={servicio}
                    />
                :
                    <Modal>No se puede editar un servicio que ya ha sido completado o no realizado</Modal>
                
            }
        </>
    )
}