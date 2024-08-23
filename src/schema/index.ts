import { z } from "zod";

export const ServicioSchema = z.object({
    id: z.string(),
    ordenServicio: z.object({
        id: z.string(),
        solicito: z.string(),
        urlOrdenCompra: z.string(),
        ordenCompra: z.string()
    }),
    fechaEjecucion: z.date(),
    descripcion: z.string(),
    costo: z.number(),
    tipoServicio: z.string(),
    idConductor: z.string(),
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
    presupuesto: PresupuestoSchema,
    urlOrdenCompra: z.string(),
    ordenCompra: z.string()
});

export const EmisorReceptorSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    rfc: z.string()
});

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
    ordenCompra: z.string(),
    ie: z.string(),
    total: z.number(),
    cargaEdicom: z.boolean(),
    estado: z.string(),
    comentarios: z.string()
});

// Schema Forms
export const ServiceFormSchema = ServicioSchema.pick({
    id: true,
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