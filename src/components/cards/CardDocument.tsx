import { formatCurrency, formatDate } from "@/src/lib";
import type { CardDocumentInfo, CardDocumentType } from "@/src/types";
import Link from "next/link";

type CardDocumentProps = {
    document: CardDocumentInfo;
    documentType: CardDocumentType;
}

export default function CardDocument({document, documentType}: CardDocumentProps) {
    return (
        <div 
            className="p-4 bg-backgroundColor border border-borderColor rounded-xl text-mutedColor-foreground hover:bg-charColor-char4 hover:border-charColor-char4 hover:text-white group"
        >
            <Link 
                href={`/${documentType}/${document.id}`}
            >
                <p className="">#{document.id}</p>
                              
                <p className="font-bold text-2xl pt-3 text-foregroundColor group-hover:text-white">{document.proveedor}</p>

                <p className="font-semibold  pb-3 text-secondaryColor-foreground group-hover:text-white">Solicito:{' '}
                    <span className="font-normal">{document.solicito}</span>
                </p>

                <p className="font-semibold">Fecha: {' '}
                    <span className="font-normal">{formatDate(document.fecha)}</span>
                </p>

                { document.ordenCompra && (
                    <p className="font-semibold">No. OC:{' '}
                        <span className="font-normal">{document.ordenCompra}</span>
                    </p>
                )}

                <p className="font-semibold">Total:{' '}
                    <span className="font-normal">{formatCurrency(document.total)}</span>
                </p>

                <p className="pt-2 italic">{document.estado}</p>
            </Link>
        </div>
    )
}