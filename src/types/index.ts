import { z } from "zod";
import { 
    EmisorReceptorSchema, 
    FacturaSchema, 
    GestionCobrosSchema, 
    OrdenServicioSchema, 
    PresupuestoSchema, 
    ServicioSchema,
    PresupuestoFormSchema,
    ServiceFormSchema,
    OrdenServicioFormSchema,
    FacturaFormSchema,
    GestionCobroFormSchema,
    ConductoresSchema
} from "../schema";

export type Servicio = z.infer<typeof ServicioSchema>;
export type Presupuesto = z.infer<typeof PresupuestoSchema>;
export type OrdenServicio = z.infer<typeof OrdenServicioSchema>;
export type Factura = z.infer<typeof FacturaSchema>;
export type EmisorReceptor = z.infer<typeof EmisorReceptorSchema>;
export type GestionCobros = z.infer<typeof GestionCobrosSchema>;

export type DocumentTypeURL = 'presupuestos'|'ordenes-servicios'|'servicios'|'facturacion'|'gestion-cobros';

// Types formularios
export type PresupuestoFormData = z.infer<typeof PresupuestoFormSchema>;
export type ServiceFormData = z.infer<typeof ServiceFormSchema>;
export type OrdenServicioFormData = z.infer<typeof OrdenServicioFormSchema>;
export type FacturaFormData = z.infer<typeof FacturaFormSchema>;
export type GestionCobroFormData = z.infer<typeof GestionCobroFormSchema>;

// Types Card Document
export type CardPresupuesto = Pick<Presupuesto, 'id'|'fecha'|'proveedor'|'solicito'|'total'|'estado'>;
export type CardOrdenServicio = Pick<OrdenServicio, 'id'|'fecha'|'proveedor'|'solicito'|'total'|'estado'|'ordenCompra'>;

export type CardServicio = Pick<Servicio, 'id'|'fechaEjecucion'|'idConductor'|'tipoServicio'|'estado'|'costo'> & {
    ordenServicio: Pick<OrdenServicio, 'id'|'proveedor'|'solicito'|'ordenCompra'>
};

export type CardFactura = Pick<Factura, 'id'|'fecha'|'estado'|'folio'> & {
    ordenServicio: Pick<OrdenServicio, 'id'|'proveedor'|'solicito'|'total'|'ordenCompra'>;
};

export type CardCobro = Pick<GestionCobros, 'id'|'ie'|'edicom'|'pagado'> & {factura: CardFactura};

// Types Estados
export type EstadoPresupuesto = 'pending'|'accept'|'reject';
export type EstadoOrdenServicio = 'assign'|'inProgress'|'complete'|'noShow';
export type EstadoServicio = 'assign'|'inProgress'|'complete'|'noShow';
export type EstadoFactura = 'sealed'|'notsealed';

export type TipoServicio = 'personal'|'paqueteria';

// Types Fechas duplicadas
export type FechasDuplicadasType = {
    [key: string]: number
};

// Type conductores
export type Conductores = z.infer<typeof ConductoresSchema>;

// Type entidades
export type EmisoresReceptores = z.infer<typeof EmisorReceptorSchema>;