import CardTable from "@/src/components/cards/CardTable";
import { CardDocumentInfo } from "@/src/types";

export default function OrdenesServiciosPage() {
    const documents = [] as CardDocumentInfo[];

    return (
        <>
            <CardTable
                documentType="ordenes-servicios"
                documents={documents}
            />
        </>
    )
}