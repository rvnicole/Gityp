import { formatCurrency, formatDate } from "@/src/lib";
import { DocumentTypeTitle, Servicio } from "@/src/types";

type ContentDocumentProps = {
    document: Servicio;
    documentTitle: DocumentTypeTitle;
}

export default function ContentService({document, documentTitle}: ContentDocumentProps) {
    return (
        <div>
            <p className="text-right">{formatDate(document.fechaEjecucion)}</p>
                                     
            <p className="font-bold text-lg pt-3">{documentTitle}{' '}
                <span className="text-2xl">#1234</span>
            </p>
                     
            <div className="w-full p-1 bg-charColor-char4 rounded-lg my-2"></div>

            <p className="font-semibold">Conductor: {' '}
                <span className="font-normal">{document.idConductor}</span>
            </p>

            <p className="font-semibold">Tipo: {' '}
                <span className="font-normal">{document.tipoServicio}</span>
            </p>

            <p className="font-semibold">Solicito: {' '}
                <span className="font-normal">{document.ordenServicio.solicito}</span>
            </p>

            <p className="font-semibold">OS:{' '}
                <span className="font-normal">{document.ordenServicio.id}</span>
            </p>   
                     
            <p className="inline-block font-semibold py-1 px-3 my-1 bg-mutedColor-foreground text-white rounded-full">PO{' '}
                <span className="font-normal">{document.ordenServicio.ordenCompra}</span>
            </p>   
            
            <p className="font-semibold py-2 text-right text-xl">{formatCurrency(document.costo)}</p>
        </div>
    )
}