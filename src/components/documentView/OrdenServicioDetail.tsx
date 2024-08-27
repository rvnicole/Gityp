import { CalendarIcon, EyeIcon, PlayIcon, HandThumbUpIcon, NoSymbolIcon} from "@heroicons/react/24/outline";
import TableServicesDetails from "./TableServicesDetails";
import { EstadoOrdenServicio, OrdenServicio } from "@/src/types";
import { estadosOrdenServicio } from "@/src/data/data";
import { formatCurrency, formatDate } from "@/src/lib";

type OrdenServicioDetailProps = {
    ordenServicio: OrdenServicio;
}

export default function OrdenServicioDetail({ ordenServicio }: OrdenServicioDetailProps) {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 text-secondaryColor-foreground">
            <div className="md:col-span-2 md:row-span-2">
                <h3 className="mb-4 font-bold text-xl md:text-3xl text-foregroundColor break-words">Orden de Servicio #{ordenServicio.id}</h3>
                <p><span className="font-semibold">Solicito:{' '}</span>{ordenServicio.solicito}</p>

                <div className="flex gap-1 align-middle">
                    <p className="font-semibold">PO:{' '}</p>
                    <p>{ordenServicio.ordenCompra}</p>
                    <a 
                        className="my-auto hover:text-primaryColor"
                        href={ordenServicio.urlOrdenCompra}
                        target="_blank"
                        title="Ver Orden de Compra"
                    >
                        <EyeIcon className="size-5"/>
                    </a>
                </div>
            </div>

            <div className="max-h-8	flex md:justify-end text-white text-xs md:text-sm font-semibold">
                { ordenServicio.estado === "assign" && (
                    <div className="flex items-center px-3 py-1 bg-mutedColor-foreground rounded-full">
                        <p className="px-3">{estadosOrdenServicio[ordenServicio.estado as EstadoOrdenServicio]} {' '}</p>
                        <CalendarIcon className="size-6 inline-block"/>
                    </div>
                )}

                { ordenServicio.estado === "inProgress" && (
                    <div className="flex items-center px-3 py-1 bg-primaryColor rounded-full">
                        <p className="px-3">{estadosOrdenServicio[ordenServicio.estado as EstadoOrdenServicio]} {' '}</p>
                        <PlayIcon className="size-6 inline-block"/>
                    </div>
                )}

                { ordenServicio.estado === "noShow" && (
                    <div className="flex items-center px-3 py-1 bg-mutedColor-foreground rounded-full">
                        <p className="px-3">{estadosOrdenServicio[ordenServicio.estado as EstadoOrdenServicio]} {' '}</p>
                        <NoSymbolIcon className="size-6 inline-block"/>
                    </div>
                )}

                { ordenServicio.estado === "complete" && (
                    <div className="flex items-center px-3 py-1 bg-lime-500 rounded-full">
                        <p className="px-3">{estadosOrdenServicio[ordenServicio.estado as EstadoOrdenServicio]} {' '}</p>
                        <HandThumbUpIcon className="size-6 inline-block" />
                    </div>
                )}
            </div>

            <div className="flex md:justify-end gap-5">
                <div className="font-semibold">
                    <p>Fecha:</p>
                    <p>Proveedor:</p>
                    <p>Presupuesto:</p>
                </div>

                <div>
                    <p>{formatDate(ordenServicio.fecha)}</p>
                    <p>{ordenServicio.proveedor}</p>
                    <p>#{ordenServicio.presupuesto.id}</p>
                </div>
            </div>

            <div className="md:col-span-3">
                <p className="font-semibold">Comentarios:</p>
                <p className="text-mutedColor-foreground">{ordenServicio.comentarios}</p>
            </div>

            <div className="md:col-span-3">
                <p className="font-semibold">Servicio(s)</p>
                <TableServicesDetails 
                    services={ordenServicio.servicios}
                />
            </div>

            <div className="md:col-start-3 flex justify-end gap-5">
                <div className="font-semibold flex flex-col justify-between">
                    <p>Subtotal:</p>
                    <p>IVA:</p>
                    <p>Total:</p>
                </div>

                <div className="text-right">
                    <p>{formatCurrency(ordenServicio.subtotal)}</p>
                    <p>{formatCurrency(ordenServicio.iva)}</p>
                    <p className="font-bold text-2xl">{formatCurrency(ordenServicio.total)}</p>
                </div>
            </div>
        </div>
    )
}