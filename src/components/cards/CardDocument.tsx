import Link from "next/link";
import ContentDocument from "../cardDocumentContent/ContentDocument";
import ContentService from "../cardDocumentContent/ContentService";
import ButtonsPresupuestos from "../cardDocumentButtons/ButtonsPresupuesto";
import ButtonsOrdenServicio from "../cardDocumentButtons/ButtonsOrdenServicio";
import ButtonsFactura from "../cardDocumentButtons/ButtonsFactura";
import ButtonsCobro from "../cardDocumentButtons/ButtonsCobro";
import type { 
    Servicio,
    CardDocumentInfo, 
    DocumentTypeTitle, 
    DocumentTypeURL, 
    EstadoCobro, 
    EstadoFactura, 
    EstadoOrdenServicio, 
    EstadoPresupuesto,
    EstadoServicio,
    FechasDuplicadasType
} from "@/src/types";
import ButtonsServicio from "../cardDocumentButtons/ButtonsServicio";

type CardDocumentProps = {
    document: CardDocumentInfo | Servicio;
    documentType: DocumentTypeURL;
    documentTitle: DocumentTypeTitle;
    fechasDuplicadas?: FechasDuplicadasType
}

export default function CardDocument({document, documentType, documentTitle, fechasDuplicadas}: CardDocumentProps) {
    return (
        <div className="p-7 bg-backgroundColor border border-borderColor rounded-xl text-mutedColor-foreground hover:shadow-lg hover:shadow-charColor-char4">
            <Link 
                href={`/${documentType}/${document.id}`}
            >
                {documentType === 'servicios' ? (
                    <ContentService 
                        document={document as Servicio}
                        documentTitle={documentTitle}
                        fechasDuplicadas={fechasDuplicadas!}
                    />
                ) : (
                    <ContentDocument
                        document={document as CardDocumentInfo}
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

            {documentType === 'servicios' && (
                <ButtonsServicio
                    estadoDocument={document.estado as EstadoServicio} 
                />
            )}
        </div>
    )
}