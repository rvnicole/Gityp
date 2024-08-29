"use server"

import { connectDB } from "@/config/db";
import { OrdenServicio } from "@/model/OrdenServicio";
import { Presupuesto } from "@/model/Presupuesto";
import { Presupuesto as PresupuestoType} from "@/src/types";

export async function createOrdenServicio(presupuestoID: PresupuestoType['id']) {
    try {
        await connectDB();

        const presupuesto = await Presupuesto.findById(presupuestoID);

        const data:any = {...presupuesto, presupuesto: presupuesto.id};
        delete data.id;

        const ordenServicio = await new OrdenServicio(data);
        await ordenServicio.save();

        return { success: true, message: "Orden de Servicio Creada Correctamente"}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al crear la Orden de Servicio'}
    }
}