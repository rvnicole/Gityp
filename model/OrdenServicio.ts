import mongoose, { Document, PopulatedDoc, Schema, Types, models, ObjectId } from "mongoose";
import { IPresupuesto, Presupuesto } from "./Presupuesto";
import { IServicio, Servicio } from "./Servicio";
import { Factura } from "./Factura";

const statusPresupuesto = {
    ASSIGN: 'assign',
    INPROGRESS: 'inProgress',
    COMPLETE: 'complete',
    NOSHOW: 'noShow'
};

export interface IOrdenServicio extends Document {
    fecha: Date,
    proveedor: string,
    solicito: string,
    servicios: PopulatedDoc<IServicio & Document>[]
};

const OrdenServicioSchema: Schema = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    proveedor: {
        type: String
    },
    solicito: {
        type: String,
        required: true
    },
    servicios: [
        {
            type: Types.ObjectId,
            ref: Servicio
        }
    ],
    comentarios: {
        type: String
    },
    subtotal: {
        type: Number,
        required: true
    },
    iva: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        required: true,
        default: statusPresupuesto.ASSIGN
    },
    ordenCompra: {
        type: String
    },
    urlOrdenCompra: {
        type: String
    },
    presupuesto: {
        type: Types.ObjectId,
        ref: Presupuesto,
        required: true
    }
}, { timestamps: true });


OrdenServicioSchema.post('save', async (doc) => {
    if( doc.estado === 'assign' ){
        
        const servicios = doc.servicios as ObjectId[];        
        
        for( const servicio of servicios ){
            
            const documentServicio = await Servicio.findById(servicio);            
            documentServicio.ordenServicio = doc._id;
            await documentServicio.save();
        };
        
    }
});

OrdenServicioSchema.post('updateOne', async (doc) => {
    if( doc.estado === 'complete' ){
        const factura = await new Factura();
        factura.fecha = new Date();
        factura.folio = '2000';
        await factura();
    }
});

export const OrdenServicio = models.OrdenServicio || mongoose.model<IOrdenServicio>('OrdenServicio', OrdenServicioSchema );