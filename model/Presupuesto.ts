import mongoose, { Document, PopulatedDoc, Schema, Types, models } from "mongoose";
import { Presupuesto as PresupuestoType } from "@/src/types";
import { IServicio } from "./Servicio";

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
        default: statusPresupuesto.PENDING
    }
}, { timestamps: true });

export const Presupuesto = models.Presupuesto || mongoose.model<IPresupuesto>('Presupuesto', PresupuestoSchema );