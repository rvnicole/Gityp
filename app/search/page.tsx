import { connectDB } from "@/config/db";
import { Factura } from "@/model/Factura";
import { GestionCobro } from "@/model/GestionCobro";
import { OrdenServicio } from "@/model/OrdenServicio";
import { Presupuesto } from "@/model/Presupuesto";
import { Servicio } from "@/model/Servicio";
import CardTable from "@/src/components/cards/CardTable";
import { Presupuesto as PresupuestoType, } from "@/src/types";

async function searchPresupuestos( tipoBusqueda: string, q: string ){
    console.log({tipoBusqueda, q});
    switch( tipoBusqueda ){ 
        case 'mongoId': {
            return await Presupuesto.find({ _id: q });
        }
        case 'regex': {
            const regex = new RegExp(q, 'i');
            return await Presupuesto.find({
                $or: [
                    { solicito: { $regex: regex } },
                    { comentarios: { $regex: regex } },
                    { estado: { $regex: regex } }
                ]
            });
        }
        case 'monto': {
            return await Presupuesto.find({ total: q });
        }
    }
};

async function searchOrdenes( tipoBusqueda: string, q: string ){
    switch( tipoBusqueda ){ 
        case 'mongoId': {
            return await OrdenServicio.find({
                $or: [
                    { _id: q },
                    { presupuesto: q }
                ]
            });
        }
        case 'regex': {
            const regex = new RegExp(q, 'i');
            return await OrdenServicio.find({
                $or: [
                    { solicito: { $regex: regex } },
                    { comentarios: { $regex: regex } },
                    { estado: { $regex: regex } },
                    { ordenCompra: { $regex: regex } }
                ]
            });
        }
        case 'monto': {
            return await OrdenServicio.find({ total: q });
        }
    }
};

async function searchServicios( tipoBusqueda: string, q: string ){
    switch( tipoBusqueda ){ 
        case 'mongoId': {
            return await Servicio.find({
                $or: [
                    { _id: q },
                    { ordenServicio: q }
                ]
            });
        }
        case 'regex': {
            const regex = new RegExp(q, 'i');
            return await Servicio.find({
                $or: [
                    { descripcion: { $regex: regex } },
                    { nota: { $regex: regex } },
                    { tipoServicio: { $regex: regex } },
                    { estado: { $regex: regex } }
                ]
            });
        }
        case 'monto': {
            return await Servicio.find({ total: q });
        }
    }
}

async function searchFacturas( tipoBusqueda: string, q: string ){
    switch( tipoBusqueda ){ 
        case 'mongoId': {
            return await Factura.find({
                $or: [
                    { _id: q },
                    { ordenServicio: q }
                ]
            });
        }
        case 'regex': {
            const regex = new RegExp(q, 'i');
            return await Factura.find({
                $or: [
                    { estado: { $regex: regex } },
                    { folio: { $regex: regex } },
                    { folioFiscal: { $regex: regex } }
                ]
            });
        }
    }
}

async function searchCobros( tipoBusqueda: string, q: string ){
    switch( tipoBusqueda ){ 
        case 'mongoId': {
            return await GestionCobro.find({
                $or: [
                    { _id: q },
                    { factura: q }
                ]
            });
        }
        case 'regex': {
            const regex = new RegExp(q, 'i');
            return await GestionCobro.find({
                $or: [
                    { comentarios: { $regex: regex } },
                    { ie: { $regex: regex } }
                ]
            });
        }
    }
}

async function searchDocuments( searchParams: { document: string, q: string }){
    await connectDB();

    const regExpMongoId = /[a-z0-9]{24}/;
    let tipoBusqueda: 'mongoId' | 'monto' | 'regex' = 'regex';
    if( regExpMongoId.test(searchParams.q) ){
        tipoBusqueda = 'mongoId';
    }
    else if( !isNaN(+searchParams.q) ){
        console.log('ES UN NUMERO');
        tipoBusqueda = 'monto'
    }

    switch(searchParams.document){
        case 'presupuestos': {
            const presupuestos = await searchPresupuestos(tipoBusqueda, searchParams.q);
            return presupuestos;
        };
        break;
        case 'ordenes-servicios': {
            const ordenes = await searchOrdenes(tipoBusqueda, searchParams.q);
            return ordenes;
        }
        break;
        case 'servicios': {
            const servicios = await searchServicios(tipoBusqueda, searchParams.q);
            return servicios
        }
        break;
        case 'facturacion': {
            const facturas = await searchFacturas(tipoBusqueda, searchParams.q);
            return facturas;
        }
        break;
        case 'gestion-cobros': {
            const cobros = await searchCobros(tipoBusqueda, searchParams.q);
            return cobros;
        }
        break;
    }
    return 
};

type SearchPageProps = {
    searchParams: {
        document: 'presupuestos' | 'ordenes-servicios' | 'servicios' | 'facturacion' | 'gestion-cobros',
        q: string,
    }
}

export default async function SearchPage( params: SearchPageProps ){
    
    const documents = await searchDocuments(params.searchParams) as PresupuestoType[] || [];
    console.log(documents);
    if( documents.length > 0 )  return (
        <div className="space-y-5">
            <CardTable
                documents={documents}
                documentType={params.searchParams.document}
            />
        </div>
    )
    else return (
        <p className="p-10 text-center w-full">Sin resultados</p>
    )
};