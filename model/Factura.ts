import mongoose, { Document, Schema, PopulatedDoc, Types, models } from "mongoose";
import { IOrdenServicio, OrdenServicio } from "./OrdenServicio";
import { EmisorReceptor, IEmisorReceptor } from "./EmisorReceptor";
import { string } from "zod";

const statusFactura = {
    SEALED: 'sealed',
    NOTSEALED: 'notsealed'
};

export interface IFactura extends Document {
    fecha: Date,
    ordenServicio: PopulatedDoc<IOrdenServicio & Document>,
    fechaSellado: Date,
    estado: string,
    urlFactura: string,
    emisor: PopulatedDoc<IEmisorReceptor & Document>,
    receptor: PopulatedDoc<IEmisorReceptor & Document>,
    folio: string,
    folioFiscal: string
};

const FacturaSchema: Schema = new Schema({
    fecha: {
        type: Date,
        required: true,
        default: new Date()
    },
    ordenServicio: {
        type: Types.ObjectId,
        ref: OrdenServicio,
        required: true
    },
    fechaSellado: {
        type: Date
    },
    estado: {
        type: string,
        required: true,
        default: statusFactura.NOTSEALED
    },
    urlFactura: {
        type: string
    },
    emisor: {
        type: Types.ObjectId,
        ref: EmisorReceptor
    },
    receptor: {
        type: Types.ObjectId,
        ref: EmisorReceptor
    },
    folio: {
        type: string,
        required: true
    },
    folioFiscal: {
        type: string
    }
}, { timestamps: true });

export const Factura = models.Factura || mongoose.model<IFactura>('Factura', FacturaSchema);