import mongoose, { Document, Schema, PopulatedDoc, Types, models } from "mongoose";
import { IOrdenServicio, OrdenServicio } from "./OrdenServicio";
import { EmisorReceptor, IEmisorReceptor } from "./EmisorReceptor";
import { string } from "zod";
import { GestionCobro } from "./GestionCobro";
import { myDateMX } from "@/src/lib";

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
        ref: 'OrdenServicio' || OrdenServicio,
        required: true
    },
    fechaSellado: {
        type: Date
    },
    estado: {
        type: String,
        required: true,
        default: statusFactura.NOTSEALED
    },
    urlFactura: {
        type: String
    },
    emisor: {
        type: Types.ObjectId,
        ref: EmisorReceptor
    },
    receptor: {
        type: Types.ObjectId,
        ref: 'EmisorReceptor' 
    },
    folio: {
        type: String,
        required: true
    },
    folioFiscal: {
        type: String
    }
}, { timestamps: true });

FacturaSchema.post('save',async (doc)=>{
    try{
        console.log(doc.estado, 'estado del documento factura');
        if( doc.estado === 'sealed' ){
            const gestionCobroDoc = new GestionCobro();
            gestionCobroDoc.fecha = myDateMX();
            gestionCobroDoc.factura = doc.id;
            await gestionCobroDoc.save();
        }
    }
    catch(error){
        console.log(error);
    }
});

export const Factura = models.Factura || mongoose.model<IFactura>('Factura', FacturaSchema);