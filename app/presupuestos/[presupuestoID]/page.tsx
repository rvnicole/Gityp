import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";

export default function PresupuestoIDPage({ params }: { params: {presupuestoID: string}}) {
    const { presupuestoID } = params;

    return (
        <>
            <DocumentDetail 
                documentID={presupuestoID}
            />
            <ModalEdit documentType="presupuesto" />
        </>
    )
}