"use server"
import { connectDB } from "@/config/db";
import { Servicio } from "@/model/Servicio";
import { Presupuesto } from "@/model/Presupuesto";
import { Presupuesto as PresupuestoType, PresupuestoFormData, ServiceFormData, Servicio as ServicioType} from "@/src/types";
import ServiciosPage from "@/app/servicios/page";

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
        presupuesto.servicios = fullFormData.servicios.map( s => s.id );
        console.log(fullFormData.servicios.map( s => s.id ));
        
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

        // Actualizar o eliminar
        fullFormData.formData.servicios!.forEach( async servicioAnterior => {
            const servicio = serviciosF.find( s => s.id.toString() === servicioAnterior.id.toString() );
            console.log('SE encontro el servicio para actualizar', servicio);
            if( servicio ){
                const ser = await Servicio.findById(servicio.id);
                console.log(ser, 'Servicio que se va actualizar');
                if( ser ){
                    ser.costo = servicio.costo;
                    ser.descripcion = servicio.descripcion;
                    ser.estado = servicio.estado;
                    ser.nota = servicio.nota;
                    ser.tipoServicio = servicio.tipoServicio;
                    ser.fechaEjecucion = servicio.fechaEjecucion;
                    ser.idConductor = servicio.idConductor
                    await ser.save();
                }                
            }
            else{
                await Servicio.findByIdAndDelete(servicioAnterior.id);
            };
        });

        // Agregar nuevo servicio
        serviciosF.forEach( async s => {
            const servicioAnterior = formData.servicios!.find( ser => ser.id.toString() === s.id.toString() );
            if( !servicioAnterior ){
                const servicioNuevo = new Servicio(s);
                await servicioNuevo.save();
            }
        });       
        
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