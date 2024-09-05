"use server"

import { connectDB } from "@/config/db";
import { GestionCobro } from "@/model/GestionCobro";
import { GestionCobroFormData, GestionCobros } from "@/src/types";
import mongoose from "mongoose";

export async function updateCobro(formData: Omit<GestionCobroFormData, 'factura'>) {
    try {
        await connectDB();

        console.log("COBRO - FORMDATA", formData);

        if( !mongoose.Types.ObjectId.isValid(formData.id) ) {
            return { success: false, message: "Cobro Inválido"}
        }

        const cobro = await GestionCobro.findById(formData.id);
        if( !cobro ) {
            return { success: false, message: "Cobro No Encontrado"}
        }  

        cobro.ie = formData.ie;
        cobro.edicom = formData.edicom;
        cobro.pagado = formData.pagado;
        cobro.comentarios = formData.comentarios;

        await cobro.save();
        return { success: true, message: "Cobro Actualizado Correctamente"}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al Editar el Cobro'}
    }
}

export async function updateEstadoCobro({id, pagado}: Pick<GestionCobros, 'id'|'pagado'>) {
    try {
        await connectDB();

        const cobro = await GestionCobro.findById(id);
        cobro.pagado = pagado;
        await cobro.save();
        return { success: true, message: "Estado Actualizado Correctamente"}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al Actualizar el Estado'}
    }
}