import DocumentDetail from "@/src/components/documentView/DocumentDetail";

export default function PresupuestoIDPage({ params }: { params: {presupuestoID: string}}) {
    const { presupuestoID } = params;

    return (
        <>
            <DocumentDetail 
                documentID={presupuestoID}
            />
        </>
    )
}