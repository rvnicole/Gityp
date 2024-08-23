import Link from "next/link";
import ButtonsPresupuestos from "../cardDocumentButtons/ButtonsPresupuesto";
import type { CardDocumentInfo, DocumentTypeTitle, DocumentTypeURL, EstadoPresupuesto } from "@/src/types";
import ContentDocument from "../cardDocumentContent/ContentDocument";
import ContentService from "../cardDocumentContent/ContentService";

type CardDocumentProps = {
    document: CardDocumentInfo;
    documentType: DocumentTypeURL;
    documentTitle: DocumentTypeTitle;
}

export default function CardDocument({document, documentType, documentTitle}: CardDocumentProps) {
    return (
        <div 
            className="p-7 bg-backgroundColor border border-borderColor rounded-xl text-mutedColor-foreground hover:shadow-lg hover:shadow-charColor-char4"
        >
            <Link 
                href={`/${documentType}/${document.id}`}
            >
                {documentType === 'servicios' ? (
                    <ContentService />
                ) : (
                    <ContentDocument
                        document={document}
                        documentTitle={documentTitle}
                    /> 
                )}
            </Link>

            {documentType === 'presupuestos' && (
                <ButtonsPresupuestos 
                    estadoDocument={document.estado as EstadoPresupuesto} 
                />
            )}
        </div>
    )
}