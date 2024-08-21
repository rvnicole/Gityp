import { z } from "zod";
import { 
    EmisorReceptorSchema, 
    FacturaSchema, 
    GestionCobrosSchema, 
    OrdenServicioSchema, 
    PresupuestoSchema, 
    ServicioSchema 
} from "../schema";

export type Servicio = z.infer<typeof ServicioSchema>;
export type Presupuesto = z.infer<typeof PresupuestoSchema>;
export type OrdenServicio = z.infer<typeof OrdenServicioSchema>;
export type Factura = z.infer<typeof FacturaSchema>;
export type EmisorReceptor = z.infer<typeof EmisorReceptorSchema>;
export type GestionCobros = z.infer<typeof GestionCobrosSchema>;