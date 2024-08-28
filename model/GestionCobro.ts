import mongoose, { Document, Schema, PopulatedDoc, Types, models } from "mongoose";
import { IFactura } from "./Factura";

export interface IGestionCobro {
    comentarios: string,
    factura: PopulatedDoc<IFactura & Document>
    ie: string;
    edicom: boolean;
    pagado: boolean;
};

const GestionCobroSchema: Schema = new Schema({
    comentarios: {
        type: String
    },
    factura: {
        type: Types.ObjectId,
        ref: 'Factura',
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
        types: Boolean,
        default: false
    }
}, { timestamps: true });

export const GestionCobro = models.GestionCobro || mongoose.model<IGestionCobro>('GestionCobro', GestionCobroSchema);