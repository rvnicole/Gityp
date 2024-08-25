import { formatCurrency, formatDate } from "@/src/lib";
import type { CardDocumentInfo, DocumentTypeTitle } from "@/src/types";

type ContentDocumentProps = {
    document: CardDocumentInfo;
    documentTitle: DocumentTypeTitle;
}

export default function ContentDocument({document, documentTitle}: ContentDocumentProps) {
    return (
        <div>
            <p className="text-right">{formatDate(document.fecha)}</p>
                                     
            <p className="font-bold text-lg pt-3">{documentTitle}{' '}
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
                <p className="inline-block font-semibold py-1 px-3 my-1 bg-mutedColor-foreground text-white rounded-full">PO{' '}
                <span className="font-normal">{document.ordenCompra}</span>
            </p> 
            )}
            
            <p className="font-semibold py-2 text-right text-xl">{formatCurrency(document.total)}</p>
        </div>
    )
}