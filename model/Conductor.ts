import mongoose, { Document, PopulatedDoc, Schema, Types, models } from "mongoose";

export interface IConductor extends Document {
    nombre: string;
    apellido: string;
    edad: number;
    licencia: string;
};

const ConductorSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
    },
    edad: {
        type: Number
    },
    licencia: {
        type: String
    },
    inactivo: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

export const Conductor = models.Conductor || mongoose.model<IConductor>('Conductor', ConductorSchema);