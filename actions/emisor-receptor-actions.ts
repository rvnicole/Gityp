"use server"

import { connectDB } from "@/config/db";
import { EmisorReceptor } from "@/model/EmisorReceptor";
import { EmisoresReceptoresSchema } from "@/src/schema";
import { EmisorReceptor as EmisorReceptorType } from "@/src/types";

export async function createEmisorReceptor(formData: Pick<EmisorReceptorType, 'nombre'|'rfc'|'tipo'>) {
    try {
        await connectDB();
        const tipoTexto = formData.tipo === "emisor" ? "Emisor" : "Receptor";

        const queryEmisorReceptor = await EmisorReceptor.find({ rfc: formData.rfc, inactivo: false });
        if( queryEmisorReceptor.length > 0 ){
            return {
                success: true,
                message: `${tipoTexto} Encontrado`, 
                data: JSON.stringify(queryEmisorReceptor[0])
            }
        };

        const emisorReceptor = await new EmisorReceptor(formData);
        await emisorReceptor.save();
        
        return { success: true, message: `${tipoTexto} Creado Correctamente`, data: JSON.stringify(emisorReceptor) }
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al crear el Emisor/Receptor'}
    }
}

export async function updateEmisorReceptor(formData: EmisorReceptorType) {
    try {
        await connectDB();

        const emisorReceptor = await EmisorReceptor.findById(formData.id);

        emisorReceptor.nombre = formData.nombre;
        emisorReceptor.rfc = formData.rfc;
        await emisorReceptor.save();
        
        const tipoTexto = formData.tipo === "emisor" ? "Emisor" : "Receptor";
        return { success: true, message: `${tipoTexto} Actualizado Correctamente`}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al actualizar el Emisor/Receptor'}
    }
}

export async function deleteEmisorReceptor({ id }: Pick<EmisorReceptorType, 'id'>) {
    try {
        await connectDB();

        const emisorReceptor = await EmisorReceptor.findById(id);
        emisorReceptor.inactivo = true;
        await emisorReceptor.save();
        
        const tipoTexto = emisorReceptor.tipo === "emisor" ? "Emisor" : "Receptor";
        return { success: true, message: `${tipoTexto} Eliminado Correctamente`}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al eliminar el Emisor/Receptor'}
    }
}

export async function getEmisorReceptor(){
    try {
        await connectDB();
        const emisorReceptor = await EmisorReceptor.find({ inactivo: false });
        const { data, success, error } = EmisoresReceptoresSchema.safeParse(emisorReceptor);
        if( success ){
            return data;
        };
    }
    catch(error) {           
        return { success: false, message: 'Error al obtener los Emisores y Receptores'}
    }
}