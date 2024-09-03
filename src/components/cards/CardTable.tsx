import CardDocument from "./CardDocument";
import ContentPresupuesto from "../cardDocumentContent/ContentPresupuesto";
import ContentService from "../cardDocumentContent/ContentService";
import ContentOrdenServicio from "../cardDocumentContent/ContentOrdenServicio";
import ContentFactura from "../cardDocumentContent/ContentFactura";
import ContentCobro from "../cardDocumentContent/ContentCobro";
import type { 
    DocumentTypeURL, 
    CardPresupuesto,
    CardOrdenServicio,
    CardServicio, 
    CardFactura,
    CardCobro,
    FechasDuplicadasType 
} from "@/src/types";

type CardTableProps = {
    documents: CardPresupuesto[] | CardOrdenServicio[] | CardServicio[] | CardFactura[] | CardCobro[];
    documentType: DocumentTypeURL;
    fechasDuplicadas?: FechasDuplicadasType;
}

type FunctionProps = {
    document: CardPresupuesto | CardOrdenServicio | CardServicio | CardFactura | CardCobro;
    documentType: DocumentTypeURL;
    fechasDuplicadas?: FechasDuplicadasType;
}

function contentCard({documentType, document, fechasDuplicadas}: FunctionProps) {
    switch(documentType) {
        case "presupuestos":
            return <ContentPresupuesto document={document as CardPresupuesto}/>
        case "ordenes-servicios":
            return <ContentOrdenServicio document={document as CardOrdenServicio}/>
        case "servicios":
            return <ContentService document={document as CardServicio} fechasDuplicadas={fechasDuplicadas as FechasDuplicadasType}/>
        case "facturacion":
            return <ContentFactura document={document as CardFactura}/>
        case "gestion-cobros":
            return <ContentCobro document={document as CardCobro}/>
    }
}

export default function CardTable({documentType, documents, fechasDuplicadas}: CardTableProps) {
    return (
        <div className="py-3 w-full grid gap-5 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 xs: grid-cols-1">
            {
                documents.map( document => (
                    <CardDocument key={document.id}> 
                        {contentCard({documentType, document, fechasDuplicadas})}
                    </CardDocument>
                ))
            }
        </div>
    )
}