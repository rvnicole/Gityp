"use server"
import { connectDB } from "@/config/db";
import { Servicio } from "@/model/Servicio";
import { Presupuesto } from "@/model/Presupuesto";
import { Presupuesto as PresupuestoType, PresupuestoFormData, ServiceFormData } from "@/src/types";

type ActionPresupuestoParams = {
    formData: PresupuestoFormData & { id: PresupuestoType['id'] }, 
    servicios: Pick<ServiceFormData, 'id' | 'costo' | 'descripcion' | 'estado' | 'fechaEjecucion' | 'nota' | 'tipoServicio' | 'idConductor'>[]
}

export async function createPresupuesto(fullFormData: ActionPresupuestoParams ){
    try{
        await connectDB();
        const servicios = await Servicio.insertMany(fullFormData.servicios);
        const presupuesto =  new Presupuesto(fullFormData.formData);
        presupuesto.servicios = servicios;
        await presupuesto.save();
        return {
            success: true,
            message: 'Presupuesto creado'
        };
    }
    catch(error){
        console.log(error);
        return {
            success: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al crear el presupuesto'
        }
    };
};

export async function updateStatusPresupuesto(id: PresupuestoType['id'], estado: PresupuestoType['estado']){
    try{
        await connectDB();
        const presupuesto = await Presupuesto.findById(id);
        if( !presupuesto ){
            return {
                success: false,
                message: 'Presupuesto no encontrado'
            };
        };
        
        // LLAMAR A LA FUNCION QUE CREA SERVICIOS


        presupuesto.estado = estado;
        await presupuesto.save();
        return {
            success: true,
            message: 'Presupuesto actualizado'
        }
    }
    catch(error){
        console.log(error);
        return {
            success: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al crear el presupuesto'
        }
    };
};