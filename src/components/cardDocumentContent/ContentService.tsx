import { formatCurrency, formatDate } from "@/src/lib";
import { DocumentTypeTitle, FechasDuplicadasType, Servicio } from "@/src/types";

type ContentDocumentProps = {
    document: Servicio;
    documentTitle: DocumentTypeTitle;
    fechasDuplicadas: FechasDuplicadasType
}

type ColoresDuplicados = {
    [key: number]: string;
}

const coloresDuplicados: ColoresDuplicados= {
    2: "bg-yellow-400",
    3: "bg-orange-400",
    4: "bg-destructiveColor"
}

export default function ContentService({document, documentTitle, fechasDuplicadas}: ContentDocumentProps) {
    const numFechasDuplicados = Number(fechasDuplicadas[formatDate(document.fechaEjecucion)]);

    return (
        <div>
            {
                numFechasDuplicados > 1 ? 
                    <p className="text-right"><span className={`${coloresDuplicados[numFechasDuplicados]} bg- text-white font-semibold px-2 py-1 rounded-2xl`}>{formatDate(document.fechaEjecucion)}</span></p>
                :
                    <p className="text-right">{formatDate(document.fechaEjecucion)}</p>
            }                                     
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