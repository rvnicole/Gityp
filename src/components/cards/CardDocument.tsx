import Link from "next/link";
import { formatCurrency, formatDate } from "@/src/lib";
import ButtonsPresupuestos from "../cardDocumentButtons/ButtonsPresupuesto";
import type { CardDocumentInfo, DocumentTypeTitle, DocumentTypeURL, EstadoPresupuesto } from "@/src/types";

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
                <p className="text-right">{formatDate(document.fecha)}</p>
                                     
                <p className="font-bold text-lg pt-3">
                    {documentTitle}{' '}
                    <span className="text-2xl">#1234</span>
                </p>

                <div className="w-full p-1 bg-charColor-char4 rounded-lg my-2"></div>

                <p className="font-semibold">Solicito: {' '}
                    <span className="font-normal">{document.solicito}</span>
                </p>

                { document.proveedor && (
                    <p className="font-semibold">Proveedor: {' '}
                        <span className="font-normal">{document.proveedor}</span>
                    </p>
                )}

                { document.ordenCompra && (
                    <p className="font-semibold">No. OC:{' '}
                        <span className="font-normal">{document.ordenCompra}</span>
                    </p>
                )}

                <p className="font-semibold py-2 text-right text-xl">{formatCurrency(document.total)}</p>
            </Link>

            {documentType === 'presupuestos' && (
                <ButtonsPresupuestos 
                    estadoDocument={document.estado as EstadoPresupuesto} 
                />
            )}

        </div>
    )
}