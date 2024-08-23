import { z } from "zod";
import { 
    EmisorReceptorSchema, 
    FacturaSchema, 
    GestionCobrosSchema, 
    OrdenServicioSchema, 
    PresupuestoSchema, 
    ServicioSchema,
    PresupuestoFormSchema,
    ServiceFormSchema
} from "../schema";
import { estadosPresupuesto } from "../data/data";

export type Servicio = z.infer<typeof ServicioSchema>;
export type Presupuesto = z.infer<typeof PresupuestoSchema>;
export type OrdenServicio = z.infer<typeof OrdenServicioSchema>;
export type Factura = z.infer<typeof FacturaSchema>;
export type EmisorReceptor = z.infer<typeof EmisorReceptorSchema>;
export type GestionCobros = z.infer<typeof GestionCobrosSchema>;

export type DocumentTypeTitle = 'Presupuesto'|'Ordenen de Servicio'|'Servicio'|'Factura'|'Cobro';
export type DocumentTypeURL = 'presupuestos'|'ordenes-servicios'|'servicios'|'facturacion'|'gestion-cobros';

// Types formularios
export type PresupuestoFormData = z.infer<typeof PresupuestoFormSchema>;
export type ServiceFormData = z.infer<typeof ServiceFormSchema>

// Types Card Document
export type CardDocumentInfo = Pick<Presupuesto, 'id'|'fecha'|'proveedor'|'solicito'|'total'|'estado'> & { ordenCompra?: string};

// Types Estados
export type EstadoPresupuesto = 'pending'|'accept'|'reject';