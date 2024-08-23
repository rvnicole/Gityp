import type { CardDocumentInfo, CardDocumentType } from "@/src/types";
import CardDocument from "./CardDocument";

type CardTableProps = {
    documentType: CardDocumentType;
    documents: CardDocumentInfo[];
}

export default function CardTable({documentType, documents}: CardTableProps) {
    return (
        <div className="p-3 w-full grid gap-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs: grid-cols-1">
            {
                documents.map( document => (
                    <CardDocument 
                        document={document}
                        documentType={documentType}
                    />
                ))
            }
        </div>
    )
}