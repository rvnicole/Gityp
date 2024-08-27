import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import FacturaDetail from "@/src/components/documentView/FacturaDetail";

export default function FacturaIDPage({ params }: { params: {facturaID: string}}) {
    const { facturaID } = params;

    return (
        <>
            <DocumentDetail 
                documentID={facturaID}
            >
                <FacturaDetail />
            </DocumentDetail>
        </>
    )
}