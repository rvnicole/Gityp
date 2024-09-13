"use server"
import mongoose, { Document } from "mongoose";
import { connectDB } from "@/config/db";
import { Servicio } from "@/model/Servicio";
import { Presupuesto } from "@/model/Presupuesto";
import { Presupuesto as PresupuestoType, PresupuestoFormData, ServiceFormData, Servicio as ServicioType} from "@/src/types";
import ServiciosPage from "@/app/servicios/page";
import { CardsPresupuestoSchema } from "@/src/schema";

type ActionPresupuestoParams = {
    formData: PresupuestoFormData & { id?: PresupuestoType['id'], servicios?: ServiceFormData[] }, 
    servicios: ServiceFormData[]
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

export async function getPresupuestos(limit:number, page:number){
    try{
        await connectDB();

        const skip = page * limit;

        const presupuestos = await Presupuesto
            .find()
            .limit(limit)
            .skip(skip)
            .sort({ fecha: -1 });

        const totalResults = await Presupuesto.countDocuments();

        const { success, data, error } = CardsPresupuestoSchema.safeParse(presupuestos);
        if( success ){
            return {data, totalResults};
        };
        error.issues.forEach( issue => console.log(issue));
    }
    catch(error){
        console.log(error);
    }
};

export async function getAllPresupuestos(){
    try{
        await connectDB();

        const consultaPresupuestos = Presupuesto.find().sort({ fecha: -1 });
        const consultaTotalResults = Presupuesto.countDocuments();
        const [presupuestos, totalResults] = await Promise.all([consultaPresupuestos, consultaTotalResults]);

        const { success, data, error } = CardsPresupuestoSchema.safeParse(presupuestos);
        if( success ){
            return {data, totalResults};
        };
        error.issues.forEach( issue => console.log(issue));
    }
    catch(error){
        console.log(error);
    }
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

export async function updatePresupuesto( fullFormData: ActionPresupuestoParams  ){
    try{
        // formData son los datos actualizados del presupuesto
        // fullFormData.servicios son los servicios actualizados para el presupuesto
        // formData.servicios contiene los servicios anteriores estos no se toman en cuenta

        const { formData } = fullFormData;

        const presupuesto = await Presupuesto.findById(fullFormData.formData.id);
        presupuesto.fecha = formData.fecha;
        presupuesto.proveedor = formData.proveedor;
        presupuesto.solicito = formData.solicito;
        presupuesto.subtotal = formData.subtotal;
        presupuesto.iva = formData.iva;
        presupuesto.total = formData.total;
        presupuesto.comentarios = formData.comentarios;
        
        // Formatea todos los servicios para que solo tengan un string en el id del conductor
        const serviciosF = fullFormData.servicios.map( servicioF => {
            if( typeof servicioF.idConductor === 'string' ){
                return servicioF;
            }
            return {
                ...servicioF,
                idConductor: servicioF.idConductor.id
            }
        });
        
        // Elimina los anteriores
        formData.servicios!.forEach( async servicio => await Servicio.findById(servicio.id).deleteOne() );

        // Crea los servicios nuevos
        const serviciosNuevos = await Servicio.insertMany(serviciosF);

        // Agrega los servicios nuevos al presupuesto
        presupuesto.servicios = serviciosNuevos;

        await presupuesto.save();
        
        return {
            success: true,
            message: 'Presupuesto actualizado'
        };
    }
    catch(error){
        console.log(error);
        return {
            success: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al crear el presupuesto'
        }
    };
}

export async function deletePresupuesto( id: PresupuestoType['id'] ){
    try{    
        const presupuesto = await Presupuesto.findById(id);
        if( presupuesto.estado === 'accept' ){
            throw new Error('No se puede eliminar un presupuesto que ya ha sido aceptado');
        }
        await presupuesto.deleteOne();
        return {
            success: true,
            message: 'Presupuesto eliminado'
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