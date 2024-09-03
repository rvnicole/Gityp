import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/outline";
import TableServicesDetails from "./TableServicesDetails";
import { EstadoPresupuesto, Presupuesto } from "@/src/types";
import { estadosPresupuesto } from "@/src/data/data";
import { formatCurrency, formatDate } from "@/src/lib";

type PresupuestoDetailProps = {
    presupuesto: Presupuesto;
}

export default function PresupuestoDetail({ presupuesto }: PresupuestoDetailProps) {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 text-secondaryColor-foreground">
            <div className="md:col-span-2 md:row-span-2">
                <h3 className="mb-4 font-bold text-xl md:text-3xl text-foregroundColor break-words">Presupuesto #{presupuesto.id}</h3>
                <p><span className="font-semibold">Solicito:{' '}</span>{presupuesto.solicito}</p>
            </div>

            <div className="max-h-8	flex md:justify-end text-white text-xs md:text-sm font-semibold">
                { presupuesto.estado === "pending" && (
                    <div className="flex items-center px-3 py-1 bg-mutedColor-foreground rounded-full">
                        <p className="px-3">{estadosPresupuesto[presupuesto.estado as EstadoPresupuesto]} {' '}</p>
                        <ClockIcon className="size-6 inline-block"/>
                    </div>
                )}

                { presupuesto.estado === "reject" && (
                    <div className="flex items-center px-3 py-1 bg-mutedColor-foreground rounded-full">
                        <p className="px-3">{estadosPresupuesto[presupuesto.estado as EstadoPresupuesto]} {' '}</p>
                        <XCircleIcon className="size-6 inline-block"/>
                    </div>
                )}

                { presupuesto.estado === "accept" && (
                    <div className="flex items-center px-3 py-1 bg-lime-500 rounded-full">
                        <p className="px-3">{estadosPresupuesto[presupuesto.estado as EstadoPresupuesto]} {' '}</p>
                        <CheckCircleIcon className="size-6 inline-block" />
                    </div>
                )}
            </div>

            <div className="flex flex-col md:justify-end">
                <p className="font-semibold">Fecha: {' '}
                    <span className="font-normal">{formatDate(presupuesto.fecha)}</span>
                </p>

                <p className="font-semibold">Proveedor: {' '}
                    <span className="font-normal">{presupuesto.proveedor}</span>
                </p>              
            </div>

            <div className="md:col-span-3">
                <p className="font-semibold">Comentarios:</p>
                <p className="text-mutedColor-foreground bg-accentColor py-2 px-1 rounded-lg">{presupuesto.comentarios}</p>
            </div>

            <div className="md:col-span-3">
                <p className="font-semibold">Servicio(s)</p>
                <TableServicesDetails 
                    services={presupuesto.servicios}
                />
            </div>

            <div className="md:col-start-3 flex justify-end gap-5">
                <div className="font-semibold flex flex-col justify-between">
                    <p>Subtotal:</p>
                    <p>IVA:</p>
                    <p>Total:</p>
                </div>

                <div className="text-right">
                    <p>{formatCurrency(presupuesto.subtotal)}</p>
                    <p>{formatCurrency(presupuesto.iva)}</p>
                    <p className="font-bold text-2xl">{formatCurrency(presupuesto.total)}</p>
                </div>
            </div>
        </div>
    )
}