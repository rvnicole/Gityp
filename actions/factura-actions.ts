"use server";
import { Factura } from "@/model/Factura";
import { Factura as FacturaType } from "@/src/types";

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