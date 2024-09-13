"use server"

import { connectDB } from "@/config/db";
import { GestionCobro } from "@/model/GestionCobro";
import { CardCobrosSchema } from "@/src/schema";
import { GestionCobroFormData, GestionCobros } from "@/src/types";
import mongoose from "mongoose";

export async function getCobros( limit: number, page: number, searchParams: { estado: string, fecha:string } ) {
    try {
        await connectDB();

        const { estado, fecha } = searchParams;

        const filtros: { edicom?: boolean, pagado?: boolean, fecha?: { $gte: Date, $lte: Date } } = {};

        const a = {
            edicom: true,
            noEdicom: false,
            pagado: true,
            pendiente: false
        }

        if( estado === 'edicom' || estado === 'noEdicom' ){
            filtros.edicom = a[estado];
        }
        else if( estado === 'pagado' || estado === 'pendiente' ){
            filtros.pagado = a[estado];
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
        }; 
        console.log(filtros);

        const queryCobros = GestionCobro.find(filtros)
            .populate([ { path: 'factura', populate: { path: 'ordenServicio' } }])
            .limit(limit)
            .skip(page)
            .sort({ fecha: -1 });

        const queryTotalResults = GestionCobro.countDocuments(filtros);

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