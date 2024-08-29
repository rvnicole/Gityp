import { z } from "zod";

// Esquemas entidades
export const ConductoresSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    apellido: z.string(),
    edad: z.number(),
    licencia: z.string()
});

export const ConductoresArrSchema = z.array(ConductoresSchema);

// Esquemas documentos
export const ServicioSchema = z.object({
    id: z.string(),
    ordenServicio: z.object({
        id: z.string(),
        solicito: z.string(),
        urlOrdenCompra: z.string(),
        ordenCompra: z.string()
    }).optional(),
    fechaEjecucion: z.date(),
    descripcion: z.string(),
    costo: z.number(),
    tipoServicio: z.string(),
    idConductor: ConductoresSchema,
    nota: z.string(),
    estado: z.string() 
});

export const PresupuestoSchema = z.object({
    id: z.string(),
    fecha: z.date(),
    proveedor: z.string(),
    solicito: z.string(),
    servicios: z.array( ServicioSchema ),
    subtotal: z.number(),
    iva: z.number(),
    total: z.number(),
    estado: z.string(),
    comentarios: z.string()
});

export const OrdenServicioSchema = PresupuestoSchema.extend({
    presupuesto: PresupuestoSchema.pick({ id: true }),
    urlOrdenCompra: z.string().optional(),
    ordenCompra: z.string().optional()
});

export const EmisorReceptorSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    rfc: z.string(),
    tipo: z.string()
});

export const EmisoresReceptoresSchema = z.array( EmisorReceptorSchema );

export const FacturaSchema = z.object({
    id: z.string(),
    ordenServicio: OrdenServicioSchema,
    fecha: z.date(),
    urlFactura: z.string(),
    emisor: EmisorReceptorSchema,
    receptor: EmisorReceptorSchema,
    folio: z.string(),
    folioFiscal: z.string(),
    fechaSellado: z.date(),
    estado: z.string()
});

export const GestionCobrosSchema = z.object({
    id: z.string(),
    factura: FacturaSchema,
    //ordenCompra: z.string(),
    ie: z.string(),
    //total: z.number(),
    edicom: z.boolean(),
    pagado: z.boolean(),
    comentarios: z.string()
});

// Schema Forms
export const ServiceFormSchema = ServicioSchema.pick({
    id: true,
    ordenServicio: true,
    fechaEjecucion: true,
    descripcion: true,
    idConductor: true,
    tipoServicio: true,
    estado: true,
    costo: true,
    nota: true
})/*.merge(z.object({
    controlForm: z.string()
}));*/

export const PresupuestoFormSchema = PresupuestoSchema.pick({
    fecha: true,
    proveedor: true,
    solicito: true,
    subtotal: true,
    iva: true,
    total: true,
    comentarios: true
});

export const OrdenServicioFormSchema = OrdenServicioSchema.pick({
    id: true,
    ordenCompra: true,
    comentarios: true
});

export const FacturaFormSchema = FacturaSchema.pick({
    fecha: true,
    emisor: true,
    receptor: true,
    folio: true,
    folioFiscal: true,
    fechaSellado: true,
    estado: true
});

export const GestionCobroFormSchema = GestionCobrosSchema.pick({
    id: true,
    factura: true,
    ie: true,
    edicom: true,
    pagado: true,
    comentarios: true
});

// Informacion de Cards
export const CardPresupuestoSchema = PresupuestoSchema.pick({
    id: true,
    fecha: true,
    proveedor: true,
    solicito: true,
    total: true,
    estado: true
});

export const CardsPresupuestoSchema = z.array(CardPresupuestoSchema);

export const CardOrdenServicioSchema = OrdenServicioSchema.pick({
    id: true,
    fecha: true,
    proveedor: true,
    solicito: true,
    total: true,
    estado: true,
    ordenCompra: true
});

export const CardsOrdenServicioSchema = z.array(CardOrdenServicioSchema);

export const CardServicioSchema = ServicioSchema.pick({
    id: true,
    fechaEjecucion: true,
    idConductor: true,
    tipoServicio: true,
    estado: true,
    costo: true,
}).extend({
    ordenServicio: OrdenServicioSchema.pick({
        id: true,
        proveedor: true,
        solicito: true,
        ordenCompra: true
    })
});

export const CardFacturaSchema = FacturaSchema.pick({
    id: true,
    fecha: true,
    estado: true,
    folio: true,
}).extend({
    ordenServicio: OrdenServicioSchema.pick({
        id: true,
        proveedor: true,
        solicito: true,
        total: true,
        ordenCompra: true
    })
});

export const CardCobroSchema = GestionCobrosSchema.pick({
    id: true,
    ie: true,
    edicom: true,
    pagado: true,
}).extend({
    factura: CardFacturaSchema
});