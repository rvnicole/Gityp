"use server"
import { Presupuesto } from "@/model/Presupuesto";
import { Servicio } from "@/model/Servicio";
import { PresupuestoFormData, ServiceFormData } from "@/src/types";

type CreatePresupuestoParams = {
    formData: PresupuestoFormData, 
    servicios: Pick<ServiceFormData, 'costo' | 'descripcion' | 'estado' | 'fechaEjecucion' | 'nota' | 'tipoServicio'>[]
}

export async function createPresupuesto(fullFormData: CreatePresupuestoParams ){
    try{
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