import mongoose, { Schema, Types, Document, PopulatedDoc, models } from "mongoose";
import { IConductor, Conductor } from "./Conductor";
import { IOrdenServicio, OrdenServicio } from "./OrdenServicio";

export interface IServicio extends Document {
    fechaEjecucion: Date;
    descripcion: string;
    nota: string;
    tipoServicio: string;
    costo: number;
    estado: string;
    idConductor: PopulatedDoc<IConductor & Document>
    ordenServicio: PopulatedDoc<IOrdenServicio & Document>

}

const ServicioSchema: Schema = new Schema({
    fechaEjecucion: {
        type: Date,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    nota: {
        type: String,
        trim: true
    },
    tipoServicio: {
        type: String,
        required: true
    },
    costo: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    idConductor: {
        type: Types.ObjectId,
        ref: Conductor
    },
    ordenServicio: {
        type: Types.ObjectId,
        ref: 'OrdenServicio' || OrdenServicio       
    }
}, { timestamps: true })

ServicioSchema.path('ordenServicio').options.ref = () => require('./OrdenServicio').OrdenServicio;

export const Servicio = models.Servicio || mongoose.model<IServicio>('Servicio', ServicioSchema);