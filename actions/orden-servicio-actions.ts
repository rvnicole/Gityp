"use server"

import { connectDB } from "@/config/db";
import { OrdenServicio } from "@/model/OrdenServicio";
import { Presupuesto } from "@/model/Presupuesto";
import { 
    OrdenServicioFormData,
    Presupuesto as PresupuestoType,
    OrdenServicio as OrdenServicioType
} from "@/src/types";

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

export async function getOrdenesServicioIDs() {
    try {
        await connectDB();

        const ordenesServicios = await OrdenServicio.find(
            { estado: { $in: ['assign', 'inProgress'] } },
            { _id: 1 }
        );

        const ordenesServicioIDs = ordenesServicios.map( ordenServicio => ordenServicio.id.toString());
        return ordenesServicioIDs;
    }
    catch(error) {
        console.log(error);
    }
}

export async function updateOrdenServicio(formData: OrdenServicioFormData) {
    try {
        await connectDB();

        const ordenServicio = await OrdenServicio.findById(formData.id);
        ordenServicio.ordenCompra = formData.ordenCompra;
        ordenServicio.comentarios = formData.comentarios;

        await ordenServicio.save();

        return { success: true, message: "Orden de Servicio Actualizada Correctamente"}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al crear la Orden de Servicio'}
    }
}

export async function deleteOrdenServicio(id: OrdenServicioType['id']) {
    try {
        await connectDB();

        const ordenServicio = await OrdenServicio.findById(id);        
        await ordenServicio.deleteOne();
        return { success: true, message: "Orden de Servicio Eliminada Correctamente"}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }    

        return { success: false, message: 'Error al eliminar la Orden de Servicio'}
    }
}