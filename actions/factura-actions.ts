"use server";
import { connectDB } from "@/config/db";
import { Factura } from "@/model/Factura";
import { CardFacturasSchema } from "@/src/schema";
import { FacturaFormData, Factura as FacturaType } from "@/src/types";

export async function createInvoice( invoicesData: FacturaType ){
    try{
        await connectDB();

        const queryFactura = await Factura.find({ folioFiscal: invoicesData.folioFiscal });
        if( queryFactura ){
            return {
                success: false,
                message: 'La factura ya se encuentra registrada',
                folio: invoicesData.folio,
                folioFiscal: invoicesData.folioFiscal
            };
    
        }

        const factura = await new Factura(invoicesData);
        await factura.save();

        return {
            success: true,
            message: 'Factura creada',
            folio: invoicesData.folio,
            folioFiscal: invoicesData.folioFiscal
        };

    }
    catch(error){
        console.log(error);
        return {
            success: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message as string : 'Error al generar las facturas',
            folio: invoicesData.folio,
            folioFiscal: invoicesData.folioFiscal
        }
    }
};

export async function getFacturas( limit:number, page:number,  searchParams: { estado: string, fecha:string } ){
    try{
        
        await connectDB();

        const { estado, fecha } = searchParams;

        const filtros: { estado?: string, fecha?: { $gte: Date, $lte: Date } } = {};

        if( estado ){
            filtros.estado = estado
        }
        if( fecha ){
            const start = new Date(fecha);
            const end = new Date(fecha);
            end.setDate(end.getDate()+1); // Sumar un dia para obtener el dia siguiente
            end.setSeconds(end.getSeconds()-1); // Restar un segundo para obtener las 23:59:59
            filtros.fecha = {
                $gte: start,
                $lte: end
            };
            console.log(start, end);
        }; 
        

        const skip = page * limit;
        const queryFacturas = Factura.find(filtros)
                                        .populate({ path: 'ordenServicio' })
                                        .populate({ path: 'ordenServicio', populate: [
                                            { path: 'servicios' },
                                            { path: 'servicios', populate: [
                                                { path: 'idConductor' },
                                                { path: 'ordenServicio', select: 'id solicito urlOrdenCompra ordenCompra' }
                                            ]}
                                        ]})
                                        .limit(limit)
                                        .skip(skip)
                                        .sort({ fecha: -1 });

        const queryTotalResult = Factura.countDocuments(filtros);

        const [ facturas, totalResults ] = await Promise.all([ queryFacturas, queryTotalResult ]);
                                        
        const { success, data, error } = CardFacturasSchema.safeParse(facturas);
        if( success ){
            console.log('DATOS', data);
            return { data, totalResults };
        }
        error.issues.forEach( issue => console.log(issue));
    }
    catch(error){
        console.log(error);
    };
};

export async function getAllFacturas(){
    await connectDB();
    
    const queryFacturas = Factura
        .find()
        .populate({ path: 'ordenServicio' })
        .populate({ path: 'ordenServicio', populate: [
            { path: 'servicios' },
            { path: 'servicios', populate: [
                { path: 'idConductor' },
                { path: 'ordenServicio', select: 'id solicito urlOrdenCompra ordenCompra' }
            ]}
        ]})
        .sort({ fecha: -1 });
    const queryTotalResult = Factura.countDocuments();
    const [ facturas, totalResults ] = await Promise.all([ queryFacturas, queryTotalResult ]);
                                    
    const { success, data, error } = CardFacturasSchema.safeParse(facturas);
    if( success ){
        return { data, totalResults };
    }
    error.issues.forEach( issue => console.log(issue));
};

export async function getFacturasByRangeDate({mes, anio}: {mes: string, anio:string}){
    await connectDB();

    const fechaInicial = new Date(`${anio}-${mes ? mes : '01'}-01T00:00:00.000Z`);
    const fechaFinal = new Date(`${anio}-${mes ? mes : '12'}-31T00:00:00.000Z`);
    console.log("Facturas por Rango de Fechas", {fechaInicial, fechaFinal});
    
    const queryFacturas = Factura
        .find({
            fecha: {
                $gte: fechaInicial,
                $lt: fechaFinal
            }
        })
        .populate({ path: 'ordenServicio' })
        .populate({ path: 'ordenServicio', populate: [
            { path: 'servicios' },
            { path: 'servicios', populate: [
                { path: 'idConductor' },
                { path: 'ordenServicio', select: 'id solicito urlOrdenCompra ordenCompra' }
            ]}
        ]})
        .sort({ fecha: -1 });

    const queryTotalResult = Factura.countDocuments({
        fecha: {
            $gte: fechaInicial,
            $lt: fechaFinal
        }
    });
    const [ facturas, totalResults ] = await Promise.all([ queryFacturas, queryTotalResult ]);
                                    
    const { success, data, error } = CardFacturasSchema.safeParse(facturas);
    if( success ){
        return { data, totalResults };
    }
    error.issues.forEach( issue => console.log(issue));
};

export async function checkFullDataFactura(id: FacturaType['id']){
    try{
        const factura = await Factura.findById(id);
        if( !factura.folioFiscal || !factura.emisor || !factura.receptor || !factura.fechaSellado){
            return {
                success: false,
                message: 'Llene primero los siguientes datos'
            }
        }
        return {
            success: true,
            message: 'Datos completos'
        }
    }
    catch(error){
        return {
            succes: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al obtener el estado'
        }
    }
}

export async function updateEstadoFactura( id: FacturaType['id']){
    try{
        const factura = await Factura.findById(id);
        factura.estado = 'sealed';
        await factura.save();
        return {
            success: true,
            message: 'Factura actualizada'
        }
    }
    catch(error){
        console.log(error);
        return {
            succces: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al actualizar la factura'
        }
    }
}

export async function updateFactura(formData: FacturaFormData, id: FacturaType['id']){
    try{
        const factura = await Factura.findById(id);
        factura.folioFiscal = formData.folioFiscal;
        factura.fechaSellado = formData.fechaSellado;
        factura.emisor = formData.emisor!.id;
        factura.receptor = formData.receptor!.id;
        factura.estado = 'sealed';
        await factura.save();
        return {
            success: true,
            message: 'Factura actualizada'
        }
    }
    catch(error){
        console.log(error);
        return {
            succces: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al actualizar la factura'
        }
    }
}