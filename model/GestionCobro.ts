import mongoose, { Document, Schema, PopulatedDoc, Types, models } from "mongoose";
import { Factura, IFactura } from "./Factura";

export interface IGestionCobro {
    comentarios: string,
    factura: PopulatedDoc<IFactura & Document>
    ie: string;
    edicom: boolean;
    pagado: boolean;
};

const GestionCobroSchema: Schema = new Schema({
    fecha: {
        type: Date,
        required: true,
        default: new Date()
    },
    comentarios: {
        type: String
    },
    factura: {
        type: Types.ObjectId,
        ref: 'Factura' || Factura,
        required: true
    },
    ie: {
        type: String
    },
    edicom: {
        type: Boolean,
        default: false
    },
    pagado: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const GestionCobro = models.GestionCobro || mongoose.model<IGestionCobro>('GestionCobro', GestionCobroSchema);