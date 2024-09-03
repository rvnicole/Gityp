"use server"

import { connectDB } from "@/config/db";
import { OrdenServicio } from "@/model/OrdenServicio";
import { Servicio } from "@/model/Servicio";
import { ServiceFormData, Servicio as ServicioType } from "@/src/types";
import mongoose from "mongoose";

export async function createServicio(formData: Omit<ServiceFormData, 'id'> & { searchOrdenes?: string }) {
    try {
        await connectDB();        

        const servicio = await new Servicio(formData);        
        const ordenServicio = await OrdenServicio.findById(formData.searchOrdenes).populate('servicios');

        const subtotal = ordenServicio.servicios.reduce((suma:number, servicio: ServiceFormData) => suma + servicio.costo, 0) + Number(formData.costo);
        const iva = subtotal * 0.16;
        const total = subtotal + iva;

        ordenServicio.subtotal = subtotal;
        ordenServicio.iva = iva;
        ordenServicio.total = total;
        ordenServicio.servicios.push( servicio.id);

        await Promise.all([servicio.save(), ordenServicio.save()]);
        return { success: true, message: "Servicio Creado Correctamente"}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            console.log(error.message);
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al crear el Servicio'}
    }
}

export async function deleteServicio(id: ServicioType['id']) {
    try {
        await connectDB();

        const servicio = await Servicio.findById(id);
        await servicio.deleteOne();
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            console.log(error.message);
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al eliminar el Servicio'}
    }
}

export async function updateServicio(formData: ServiceFormData) {
    try {
        console.log(formData)
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
        
        const subtotal = ordenServicio.servicios.reduce((suma:number, servicio: ServiceFormData) => servicio.id.toString() === formData.id ? suma + servicio.costo : suma + Number(formData.costo), 0);
        const iva = subtotal * 0.16;
        const total = subtotal + iva;

        ordenServicio.subtotal = subtotal;
        ordenServicio.iva = iva;
        ordenServicio.total = total;

        await Promise.all([servicio.save(), ordenServicio.save()]);
        return { success: true, message: "Servicio Actualizado Correctamente"}
    }
    catch(error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            console.log(error.message);
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al actualizar el Servicio'}
    }
}