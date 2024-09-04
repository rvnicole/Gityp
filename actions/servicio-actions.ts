"use server"

import { connectDB } from "@/config/db";
import { OrdenServicio } from "@/model/OrdenServicio";
import { Servicio } from "@/model/Servicio";
import { ServiceFormData, Servicio as ServicioType } from "@/src/types";
import { determinaEstadoOS, calculaMontos } from "@/src/lib/servicios";

export async function createServicio(formData: Omit<ServiceFormData, 'id'> & { searchOrdenes?: string }) {
    try {
        await connectDB();        

        const servicio = await new Servicio(formData);        

        const ordenServicio = await OrdenServicio.findById(formData.searchOrdenes).populate('servicios');
        ordenServicio.estado = determinaEstadoOS(ordenServicio, servicio.id, servicio.estado);
        const montos = calculaMontos(ordenServicio, servicio.id, servicio.costo);
        ordenServicio.subtotal = montos.subtotal;
        ordenServicio.iva = montos.iva;
        ordenServicio.total = montos.total;
        ordenServicio.servicios.push( servicio.id);

        servicio.ordenServicio = ordenServicio.id;

        await Promise.all([servicio.save(), ordenServicio.save()]);
        return { success: true, message: "Servicio Creado Correctamente"}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al crear el Servicio'}
    }
}

export async function updateServicio(formData: ServiceFormData) {
    try {
        await connectDB();

        const servicio = await Servicio.findById(formData.id);
        servicio.fechaEjecucion = formData.fechaEjecucion;
        servicio.descripcion = formData.descripcion;
        servicio.idConductor = formData.idConductor;
        servicio.tipoServicio = formData.tipoServicio;
        servicio.estado = formData.estado;
        servicio.costo = Number(formData.costo);
        servicio.nota = formData.nota;

        const ordenServicio = await OrdenServicio.findById(formData.ordenServicio?.id).populate('servicios');
        ordenServicio.estado = determinaEstadoOS(ordenServicio, servicio.id, servicio.estado);
        const montos = calculaMontos(ordenServicio, servicio.id, servicio.costo);
        ordenServicio.subtotal = montos.subtotal;
        ordenServicio.iva = montos.iva;
        ordenServicio.total = montos.total;

        await Promise.all([servicio.save(), ordenServicio.save()]);
        return { success: true, message: "Servicio Actualizado Correctamente"}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al actualizar el Servicio'}
    }
}

export async function updateEstadoServicio({id, estado}: Pick<ServicioType, 'id'|'estado'>) {
    try {
        await connectDB();

        const servicio = await Servicio.findById(id);
        servicio.costo = estado === "noShow" ? 0 : servicio.costo;
        servicio.estado = estado;

        const ordenServicio = await OrdenServicio.findById(servicio.ordenServicio).populate('servicios');
        ordenServicio.estado = determinaEstadoOS(ordenServicio, servicio.id, estado);
        const montos = calculaMontos(ordenServicio, servicio.id, servicio.costo);
        ordenServicio.subtotal = montos.subtotal;
        ordenServicio.iva = montos.iva;
        ordenServicio.total = montos.total;

        await Promise.all([servicio.save(), ordenServicio.save()]);
        return { success: true, message: "Estado Actualizado Correctamente"}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al Actualizar el Estado'}
    }
}

export async function deleteServicio(id: ServicioType['id']) {
    try {
        await connectDB();

        const servicio = await Servicio.findById(id);        
        await servicio.deleteOne();
        return { success: true, message: "Servicio Eliminado Correctamente"}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }    

        return { success: false, message: 'Error al eliminar el Servicio'}
    }
}