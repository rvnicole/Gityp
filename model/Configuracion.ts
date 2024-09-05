import mongoose, { Schema, models } from "mongoose";

export interface IConfiguracion {
    folioInicial: string,
    plantillas: {
        nombre: string,
        tipo: 'impresion' | 'factura'
    }[]
};

const ConfiguracionSchema: Schema = new Schema({
    folioInicial: {
        type: String
    },
    plantillas: [
        {
            nombre: String,
            tipo: String
        }
    ]
}, { timestamps: true });

export const Configuracion = models.Configuracion || mongoose.model<IConfiguracion>('Configuracion', ConfiguracionSchema);