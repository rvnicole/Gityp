import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";

export default function ServicioIDPage({ params }: { params: {servicioID: string}}) {
    const { servicioID } = params;

    return (
        <>
            <DocumentDetail 
                documentID={servicioID}
            >
                Detalles
            </DocumentDetail>
            <ModalEdit documentType="servicio" />
        </>
    )
}