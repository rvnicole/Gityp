"use server";
import { connectDB } from "@/config/db";
import { Conductor } from "@/model/Conductor";
import { ConductoresArrSchema } from "@/src/schema";
import { Conductores } from "@/src/types";

export async function createConductor(formData: Conductores){
    try{
        await connectDB();
        const conductor = new Conductor(formData);
        await conductor.save();
        return {
            success: true,
            message: 'Conductor creado'
        }
    }
    catch(error){
        console.log(error);
        return {
            success: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al crear el conductor'
        }
    }
}

export async function updateConductor(formData: Conductores){
    try{
        await connectDB();
        const conductor = await Conductor.findById(formData.id);
        if( !conductor ){
            return {
                success: false,
                message: 'Conductor no encontrado'
            };
        };
        conductor.nombre = formData.nombre;
        conductor.apellido = formData.apellido;
        conductor.edad = formData.edad;
        conductor.licencia = formData.licencia;
        await conductor.save();
        return {
            success: true,
            message: 'Conductor actualizado'
        }
    }
    catch(error){
        console.log(error);
        return {
            success: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al crear el conductor'
        }
    }
};

export async function deleteConductor(id: Conductores['id']){
    try{
        await connectDB();
        const conductor = await Conductor.findById(id);
        if( !conductor ){
            return {
                success: false,
                message: 'Conductor no encontrado'
            };
        };
        await conductor.deleteOne();
        return {
            success: true,
            message: 'Conductor eliminado'
        }
    }
    catch(error){
        console.log(error);
        return {
            success: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al crear el conductor'
        }
    }
};

export async function getConductoresAction(){
    try{
        await connectDB();
        const conductores = await Conductor.find();
        const { success, data } = ConductoresArrSchema.safeParse(conductores);
        if( success ){
            return data;
        };
    }
    catch(error){
        console.log(error);
        return {
            success: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al crear el conductor'
        }
    }
}