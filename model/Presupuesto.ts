import mongoose, { Document, PopulatedDoc, Schema, Types, models } from "mongoose";
import { IServicio, Servicio } from "./Servicio";
import { OrdenServicio } from "./OrdenServicio";

const statusPresupuesto = {
    PENDING: 'pending',
    ACCEPT: 'accept',
    REJECT: 'reject'
};

export interface IPresupuesto extends Document {
    estado: string;
    fecha: Date;
    proveedor: string;
    solicito: string;
    servicios: PopulatedDoc<IServicio & Document>
    comentarios: string;
    subtotal: number;
    iva: number;
    total: number;
}

const PresupuestoSchema: Schema = new Schema({
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
            ref: 'Servicio' || Servicio
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
        default: statusPresupuesto.PENDING
    }
}, { timestamps: true });

// Middleware post cambio de estado para la creacion de la orden de servicio
PresupuestoSchema.post('save', async (doc: IPresupuesto) => {
    if( doc.estado === 'accept' ){
        try{
            const data = {
                presupuesto: doc._id,
                fecha: new Date(),
                proveedor: doc.proveedor,
                solicito: doc.solicito,
                servicios: doc.servicios,
                comentarios: doc.comentarios,
                subtotal: doc.subtotal,
                iva: doc.iva,
                total: doc.total,
            }
            const ordenServicio = await new OrdenServicio(data);
            await ordenServicio.save();
        }
        catch(error){
            console.log(error);
        }
    };
});

export const Presupuesto = models.Presupuesto || mongoose.model<IPresupuesto>('Presupuesto', PresupuestoSchema );