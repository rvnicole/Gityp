import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import ServicioDetail from "@/src/components/documentView/ServicioDetail";
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

    const servicio = {
        id: '6699c12b1f9d4e7812fa7272',
        ordenServicio: {
            id: '6699c12b1f9d4e7812fa7271',
            solicito: 'Fulanita',
            urlOrdenCompra: 'https://heroicons.com/outline',
            ordenCompra: '67890'
        },
        fechaEjecucion: new Date('2024/02/08'),
        descripcion: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
        costo: 1000,
        tipoServicio: 'paqueteria',
        idConductor: 'Persona Conductora',
        nota: 'Ut vitae nulla hendrerit.',
        estado: 'assign'
    };

    return (
        <>
            <DocumentDetail 
                documentID={servicioID}
            >
                <ServicioDetail servicio={servicio} />
            </DocumentDetail>
            <ModalEdit 
                documentType="servicio" 
                defaultValues={defaultValues}
            />
        </>
    )
}