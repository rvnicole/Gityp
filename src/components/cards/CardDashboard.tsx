import {DashboardDocuments, DashboardDocumentsData, DocumentTypeURL} from "@/src/types";
import { estadosCobro, estadosFactura, estadosOrdenServicio, estadosPresupuesto, estadosServicios } from './../../data/data';
import { ReactNode } from "react";

type CardDashboardProps = {
    title: string;
    type: DocumentTypeURL;
    documents: DashboardDocumentsData;
    children?: ReactNode;
};

const estadosDocuments = {
    "presupuestos": estadosPresupuesto,
    "ordenes-servicios": estadosOrdenServicio,
    "servicios": estadosServicios,
    "facturacion": estadosFactura,
    "gestion-cobros": estadosCobro,
};

function agruparEstados({type, documents}: Pick<CardDashboardProps, 'type'|'documents'>) {
    const grupos: {[key: string]: DashboardDocuments}= {};

    const estados = estadosDocuments[type];

    for(const estado in estados) {
        const filtrados = documents.data.filter(document => {
            if("estado" in document) {
                return document.estado === estado
            }
            else if("pagado" in document) {
                if(estado === "paid" && document.pagado) {
                    return true;
                }
                else if(estado === "pending" && !document.pagado) {
                    return true;
                }
            }
        });
        // @ts-ignore
        const estadoStr = estados[estado];
        // @ts-ignore
        grupos[estadoStr] = filtrados;
    }
  
    return grupos;
};

export default function CardDashboard({title, type, documents, children}: CardDashboardProps) {
    const grupos = agruparEstados({type, documents});
    const estados = Object.keys(grupos);

    const estadosGreen = [estadosPresupuesto.accept, estadosOrdenServicio.complete, estadosServicios.complete, estadosFactura.sealed, estadosCobro.paid];
    const estadosBlue = [estadosOrdenServicio.inProgress, estadosServicios.inProgress];

    return (
        <div 
            className="py-6 px-4 bg-backgroundColor border border-borderColor rounded-xl text-center"
        >
            <h3 className="text-mutedColor-foreground text-2xl font-bold">{title}</h3>
            <p className="text-mutedColor-foreground">Total: {documents.totalResults}</p>

            <div className="flex pt-6 justify-center">
                { estados.map((estado, indice) => (
                    <div key={estado} className={`${indice != 0 && "border-l border-borderColor"} w-full md:w-28 flex flex-col`}>
                        <p className={`text-3xl font-bold py-2 ${estadosGreen.includes(estado) ? "text-lime-500" : estadosBlue.includes(estado) ? "text-primaryColor" : "text-mutedColor-foreground"}`}>
                            {grupos[estado].length}
                        </p>

                        <p className={`m-auto p-1 text-xs font-bold ${estadosGreen.includes(estado) ? "text-lime-500" : estadosBlue.includes(estado) ? "text-primaryColor" : "text-mutedColor-foreground"}`}>
                            {estado}
                        </p>
                    </div>
                ))}
            </div>

            {children}
        </div>
    )
}