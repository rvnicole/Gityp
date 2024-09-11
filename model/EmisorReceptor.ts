import mongoose, { Document, Schema, models } from "mongoose";
import { EmisorReceptor as EmisorReceptorType } from "@/src/types";
import { boolean } from "zod";

export interface IEmisorReceptor extends Document {
    nombre: string,
    rfc: string,
    tipo: string
};

const EmisorReceptorSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    rfc: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    tipo: {
        type: String,
        required: true
    },
    inactivo: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

export const EmisorReceptor = models.EmisorReceptor || mongoose.model<IEmisorReceptor>('EmisorReceptor', EmisorReceptorSchema);