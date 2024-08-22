import CardTable from "@/src/components/cards/CardTable";
import { CardDocumentInfo } from "@/src/types";

export default function GetionCobrosPage() {
    const documents = [] as CardDocumentInfo[];

    return (
        <>
            <CardTable
                documentType="gestion-cobros"
                documents={documents}
            />
        </>
    )
}