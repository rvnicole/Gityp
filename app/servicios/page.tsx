import CardTable from "@/src/components/cards/CardTable";
import { CardDocumentInfo } from "@/src/types";

export default function ServiciosPage() {
    const documents = [] as CardDocumentInfo[];

    return (
        <>
            <CardTable
                documentType="servicios"
                documents={documents}
            />
        </>
    )
}