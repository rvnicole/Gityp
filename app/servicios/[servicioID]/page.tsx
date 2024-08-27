import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import ServicioDetail from "@/src/components/documentView/ServicioDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";

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
            <ModalEdit documentType="servicio" />
        </>
    )
}