import mongoose, { Document, PopulatedDoc, Schema, Types, models, ObjectId } from "mongoose";
import { IPresupuesto, Presupuesto } from "./Presupuesto";
import { IServicio, Servicio } from "./Servicio";
import { Factura } from "./Factura";
import { Configuracion } from "./Configuracion";

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
    servicios: PopulatedDoc<IServicio & Document>[]
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
        ref: 'Presupuesto' || Presupuesto,
        required: true
    }
}, { timestamps: true });


OrdenServicioSchema.post('save', async (doc) => {
    if( doc.estado === 'assign' ){
        
        const servicios = doc.servicios as ObjectId[];        
        
        for( const servicio of servicios ){
            
            const documentServicio = await Servicio.findById(servicio);            
            documentServicio.ordenServicio = doc._id;
            await documentServicio.save();
        };
        
    }
    else if( doc.estado === 'complete' ){
        const configuracionDocs = await Configuracion.find();
        let folio = '1';

        if( configuracionDocs.length > 0 ) {
            const configuracion = configuracionDocs[0];
            folio = (parseInt(configuracion.folioInicial) + 1).toString();
            configuracion.folioInicial = folio;
            await configuracion.save()
        }
        else {
            const configuracion = new Configuracion({folioInicial: folio});
            await configuracion.save();
        }

        const factura = await new Factura();
        factura.fecha = new Date();
        factura.folio = folio;
        factura.ordenServicio = doc.id;
        await factura.save();
    }
});

export const OrdenServicio = models.OrdenServicio || mongoose.model<IOrdenServicio>('OrdenServicio', OrdenServicioSchema );