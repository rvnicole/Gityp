"use server"

import { connectDB } from "@/config/db";
import { OrdenServicio } from "@/model/OrdenServicio";
import { Presupuesto } from "@/model/Presupuesto";
import { Presupuesto as PresupuestoType} from "@/src/types";

export async function createOrdenServicio(presupuestoID: PresupuestoType['id']) {
    try {
        await connectDB();

        const presupuesto = await Presupuesto.findById(presupuestoID);
        presupuesto.estado = "accept";

        const data:any = {...presupuesto._doc, presupuesto: presupuesto.id};
        delete data.id;
        console.log(data);

        const ordenServicio = await new OrdenServicio(data);
        await Promise.all([ ordenServicio.save(), presupuesto.save() ]);

        return { success: true, message: "Orden de Servicio Creada Correctamente"}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al crear la Orden de Servicio'}
    }
}