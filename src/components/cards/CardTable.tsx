import type { CardDocumentInfo, DocumentTypeURL, DocumentTypeTitle, Servicio, FechasDuplicadasType } from "@/src/types";
import CardDocument from "./CardDocument";

type CardTableProps = {
    documents: CardDocumentInfo[] | Servicio[];
    documentType: DocumentTypeURL;
    documentTitle: DocumentTypeTitle;
    fechasDuplicadas?: FechasDuplicadasType
}

export default function CardTable({documentType, documents, documentTitle, fechasDuplicadas}: CardTableProps) {
    return (
        <div className="py-3 w-full grid gap-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs: grid-cols-1">
            {
                documents.map( document => (
                    <CardDocument 
                        key={document.id}
                        documentTitle={documentTitle}
                        document={document}
                        documentType={documentType}
                        fechasDuplicadas={fechasDuplicadas}
                    />
                ))
            }
        </div>
    )
}