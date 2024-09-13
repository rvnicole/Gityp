"use server"

import { connectDB } from "@/config/db";
import { GestionCobro } from "@/model/GestionCobro";
import { CardCobrosSchema } from "@/src/schema";
import { GestionCobroFormData, GestionCobros } from "@/src/types";
import mongoose from "mongoose";

export async function getCobros( limit: number, page: number ) {
    try {
        await connectDB();

        const queryCobros = GestionCobro.find()
            .populate([ { path: 'factura', populate: { path: 'ordenServicio' } }])
            .limit(limit)
            .skip(page)
            .sort({ fecha: -1 });
        const queryTotalResults = GestionCobro.countDocuments();
        const [ cobros, totalResults ] = await Promise.all([ queryCobros, queryTotalResults ]);

        const {success, data, error} = CardCobrosSchema.safeParse(cobros);
        if(success) {
            return {data, totalResults};
        };
        error.issues.forEach( error => console.log(error));
    }
    catch(error) {
        console.log(error);
    }
}

export async function getAllCobros() {
    try {
        await connectDB();

        const queryCobros = GestionCobro.find()
            .populate([ { path: 'factura', populate: { path: 'ordenServicio' } }])
            .sort({ fecha: -1 });
        const queryTotalResults = GestionCobro.countDocuments();
        const [ cobros, totalResults ] = await Promise.all([ queryCobros, queryTotalResults ]);

        const {success, data, error} = CardCobrosSchema.safeParse(cobros);
        if(success) {
            return {data, totalResults};
        };
        error.issues.forEach( error => console.log(error));
    }
    catch(error) {
        console.log(error);
    }
}

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