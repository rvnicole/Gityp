import mongoose, { Document, PopulatedDoc, Schema, Types, models } from "mongoose";
import { IServicio } from "./Servicio";

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
    servicios: PopulatedDoc<IServicio & Document>
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
            ref: 'Servicio'
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
        ref: 'Presupuesto',
        required: true
    }
}, { timestamps: true });

export const Presupuesto = models.OrdenServicio || mongoose.model<IOrdenServicio>('OrdenServicio', OrdenServicioSchema );