import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";
import { ServiceFormData } from "@/src/types";

// DATOS DE PRUEBA
const defaultValues: ServiceFormData = {
    id: 'string',
    costo: 400,
    descripcion: "Esta es una descripcion mocito emosa",
    estado: "assign",
    fechaEjecucion: new Date("2024-08-24"),
    idConductor: "conductor",
    nota: "Traslado",
    ordenServicio: 
        {
            id: 'n',
            solicito: '',
            urlOrdenCompra: 'string',
            ordenCompra: 'string'
        }
    ,
    tipoServicio: "personal"
}

export default function ServicioIDPage({ params }: { params: {servicioID: string}}) {
    const { servicioID } = params;

    return (
        <>
            <DocumentDetail 
                documentID={servicioID}
            >
                Detalles
            </DocumentDetail>
            <ModalEdit 
                documentType="servicio" 
                defaultValues={defaultValues}
            />
        </>
    )
}