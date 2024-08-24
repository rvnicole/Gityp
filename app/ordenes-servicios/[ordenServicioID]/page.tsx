import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";

export default function OrdenServicioIDPage({ params }: { params: {ordenServicioID: string}}) {
    const { ordenServicioID } = params;

    return (
        <>
            <DocumentDetail 
                documentID={ordenServicioID}
            />
            <ModalEdit documentType="ordenServicio" />
        </>
    )
}