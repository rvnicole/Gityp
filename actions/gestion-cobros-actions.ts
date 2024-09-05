"use server"

import { connectDB } from "@/config/db";
import { GestionCobro } from "@/model/GestionCobro";
import { GestionCobroFormData, GestionCobros } from "@/src/types";

export async function updateCobro(formData: GestionCobroFormData) {
    try {
        await connectDB();

        const cobro = await GestionCobro.findById(formData.id);
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