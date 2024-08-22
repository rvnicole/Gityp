import CardTable from "@/src/components/cards/CardTable";
import { CardDocumentInfo } from "@/src/types";

export default function FacturacionPage() {
    const documents = [] as CardDocumentInfo[];

    return (
        <>
            <CardTable
                documentType="facturacion"
                documents={documents}
            />
        </>
    )
}