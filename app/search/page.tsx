import { connectDB } from "@/config/db";
import { EmisorReceptor } from "@/model/EmisorReceptor";
import { Factura } from "@/model/Factura";
import { GestionCobro } from "@/model/GestionCobro";
import { OrdenServicio } from "@/model/OrdenServicio";
import { Presupuesto } from "@/model/Presupuesto";
import { Servicio } from "@/model/Servicio";
import CardTable from "@/src/components/cards/CardTable";
import { formatDate } from "@/src/lib";
import { FechasDuplicadasType, Presupuesto as PresupuestoType, Servicio as ServicioType } from "@/src/types";

async function searchPresupuestos( tipoBusqueda: string, q: string ){
    console.log({tipoBusqueda, q});
    switch( tipoBusqueda ){ 
        case 'mongoId': {
            return { 
                documents: await Presupuesto.find({ _id: q })
            }
        }
        case 'regex': {
            const regex = new RegExp(q, 'i');
            return { 
                documents: await Presupuesto.find({
                    $or: [
                        { solicito: { $regex: regex } },
                        { comentarios: { $regex: regex } },
                        { estado: { $regex: regex } }
                    ]
                })
            }            
        }
        case 'monto': {
            return {
                documents: await Presupuesto.find({ total: q })
            }
        }
    }
};

async function searchOrdenes( tipoBusqueda: string, q: string ){
    switch( tipoBusqueda ){ 
        case 'mongoId': {
            return {
                documents: await OrdenServicio.find({
                    $or: [
                        { _id: q },
                        { presupuesto: q }
                    ]
                })
            }
        }
        case 'regex': {
            const regex = new RegExp(q, 'i');
            return {
                documents: await OrdenServicio.find({
                    $or: [
                        { solicito: { $regex: regex } },
                        { comentarios: { $regex: regex } },
                        { estado: { $regex: regex } },
                        { ordenCompra: { $regex: regex } }
                    ]
                })
            }
        }
        case 'monto': {
            return {
                documents: await OrdenServicio.find({ total: q })
            }
        }
    }
};

async function searchServicios( tipoBusqueda: string, q: string ){
    let servicios: ServicioType[] = [];
    switch( tipoBusqueda ){ 
        case 'mongoId': {
            console.log('busca id', q);
            servicios = await Servicio.find({
                $or: [
                    { _id: q },
                    { ordenServicio: q }
                ]
            }).populate('idConductor').populate('ordenServicio');
        }
        break;
        case 'regex': {
            const regex = new RegExp(q, 'i');
            const ordenesServicio = await OrdenServicio.find({ solicito: { $regex: regex } });
            servicios = await Servicio.find({
                $or: [
                    { descripcion: { $regex: regex } },
                    { nota: { $regex: regex } },
                    { tipoServicio: { $regex: regex } },
                    { estado: { $regex: regex } },
                    { ordenServicio: { $in: ordenesServicio } }
                ]
            }).populate('idConductor').populate('ordenServicio');
        }
        break;
        case 'monto': {
            servicios = await Servicio.find({ total: q }).populate('idConductor').populate('ordenServicio');;
        }
        break;
    }

    const fechasDuplicadas: FechasDuplicadasType = {};
    servicios.forEach( document => fechasDuplicadas[formatDate(document.fechaEjecucion)] = fechasDuplicadas[formatDate(document.fechaEjecucion)] ? fechasDuplicadas[formatDate(document.fechaEjecucion)] + 1 : 1);
    console.log({servicios, fechasDuplicadas});
    return { documents: servicios, fechasDuplicadas };
}

async function searchFacturas( tipoBusqueda: string, q: string ){
    switch( tipoBusqueda ){ 
        case 'mongoId': {
            return {
                documents: await Factura.find({
                    $or: [
                        { _id: q },
                        { ordenServicio: q }
                    ]
                }).populate({ path: 'ordenServicio' })
                    .populate({ path: 'ordenServicio', populate: [
                        { path: 'servicios' },
                        { path: 'servicios', populate: [
                            { path: 'idConductor' },
                            { path: 'ordenServicio', select: 'id solicito urlOrdenCompra ordenCompra' }
                        ]}
                    ]}).sort({ fecha: -1 })
            }
        }
        case 'regex': {
            const regex = new RegExp(q, 'i');

            const ordenesServicio = await OrdenServicio.find({ solicito: { $regex: regex } }); 
            const receptor = await EmisorReceptor.find({ rfc: { $regex: regex } });           
            return {
                documents: await Factura.find({
                    $or: [
                        { estado: { $regex: regex } },
                        { folio: { $regex: regex } },
                        { folioFiscal: { $regex: regex } },
                        { ordenServicio: { $in: ordenesServicio } },
                        { receptor: { $in: receptor } }
                    ]
                }).populate({ path: 'ordenServicio' })
                    .populate({ path: 'ordenServicio', populate: [
                        { path: 'servicios' },
                        { path: 'servicios', populate: [
                            { path: 'idConductor' },
                            { path: 'ordenServicio', select: 'id solicito urlOrdenCompra ordenCompra' }
                        ]}
                    ]}).sort({ fecha: -1 })
            }
        };
        case 'monto': {            
            const ordenesServicio = await OrdenServicio.find({ total: q });
            const regex = new RegExp(q, 'i');
            return {
                documents: await Factura.find({
                    $or: [
                        { estado: { $regex: regex } },
                        { folio: { $regex: regex } },
                        { folioFiscal: { $regex: regex } },
                        { ordenServicio: { $in: ordenesServicio }}
                    ]
                }).populate({ path: 'ordenServicio' })
                    .populate({ path: 'ordenServicio', populate: [
                        { path: 'servicios' },
                        { path: 'servicios', populate: [
                            { path: 'idConductor' },
                            { path: 'ordenServicio', select: 'id solicito urlOrdenCompra ordenCompra' }
                        ]}
                    ]}).sort({ fecha: -1 })
            }
        };
    }
}

async function searchCobros( tipoBusqueda: string, q: string ){
    switch( tipoBusqueda ){ 
        case 'mongoId': {
            return {
                documents: await GestionCobro.find({ _id: q })
                .populate([ { path: 'factura', populate: { path: 'ordenServicio' } }])
                .sort({ fecha: -1 })
            }
        }
        case 'regex': {
            
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
            const serviciosYFechas = await searchServicios(tipoBusqueda, searchParams.q);
            return serviciosYFechas
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
    
    const query = await searchDocuments(params.searchParams) as { documents: PresupuestoType[], fechasDuplicadas: FechasDuplicadasType };
    console.log(query.documents.length);
    if( query && query.documents.length > 0 )  return (
        <div className="space-y-5">
            <h1 className="p-3 text-foregroundColor font-semibold">{query.documents.length} Resultados: </h1>
            <CardTable
                documents={query.documents}
                documentType={params.searchParams.document}
                fechasDuplicadas={query.fechasDuplicadas}
            />
        </div>
    )
    else return (
        <p className="p-10 text-center w-full">Sin resultados</p>
    )
};