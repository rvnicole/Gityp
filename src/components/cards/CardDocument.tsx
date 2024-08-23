import Link from "next/link";
import ContentDocument from "../cardDocumentContent/ContentDocument";
import ContentService from "../cardDocumentContent/ContentService";
import ButtonsPresupuestos from "../cardDocumentButtons/ButtonsPresupuesto";
import ButtonsOrdenServicio from "../cardDocumentButtons/ButtonsOrdenServicio";
import ButtonsFactura from "../cardDocumentButtons/ButtonsFactura";
import ButtonsCobro from "../cardDocumentButtons/ButtonsCobro";
import type { 
    CardDocumentInfo, 
    DocumentTypeTitle, 
    DocumentTypeURL, 
    EstadoCobro, 
    EstadoFactura, 
    EstadoOrdenServicio, 
    EstadoPresupuesto
} from "@/src/types";

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

            {documentType === 'ordenes-servicios' && (
                <ButtonsOrdenServicio
                    estadoDocument={document.estado as EstadoOrdenServicio} 
                />
            )}

            {documentType === 'facturacion' && (
                <ButtonsFactura
                    estadoDocument={document.estado as EstadoFactura} 
                />
            )}

            {documentType === 'gestion-cobros' && (
                <ButtonsCobro
                    estadoDocument={document.estado as EstadoCobro} 
                />
            )}
        </div>
    )
}