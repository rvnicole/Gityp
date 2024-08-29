import { CalendarIcon, PlayIcon, HandThumbUpIcon, NoSymbolIcon, ArrowTopRightOnSquareIcon} from "@heroicons/react/24/outline";
import { EstadoServicio, Servicio, TipoServicio} from "@/src/types";
import { estadosServicios, tipoServicio } from "@/src/data/data";
import { formatCurrency, formatDate } from "@/src/lib";

type ServicioDetailProps = {
    servicio: Servicio;
}

export default function ServicioDetail({ servicio }: ServicioDetailProps) {
    if(servicio.ordenServicio) return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 text-secondaryColor-foreground">
            <div className="md:col-span-2 md:row-span-2">
                <h3 className="mb-4 font-bold text-xl md:text-3xl text-foregroundColor break-words">Servicio #{servicio.id}</h3>
                <p><span className="font-semibold">Solicito:{' '}</span>{servicio.ordenServicio.solicito}</p>
                <p><span className="font-semibold">PO:{' '}</span>{servicio.ordenServicio.ordenCompra}</p>

                { servicio.ordenServicio.urlOrdenCompra && (
                    <a
                        className="flex gap-1 justify-center items-center w-24 max-h-8 my-1 p-1 rounded-full text-sm text-white bg-charColor-char5 hover:bg-primaryColor"
                        href={servicio.ordenServicio.urlOrdenCompra}
                        target="_blank"
                    >
                        Ver PO
                        <ArrowTopRightOnSquareIcon className="size-5 inline"/>
                    </a>
                )}
            </div>

            <div className="max-h-8	flex md:justify-end text-white text-xs md:text-sm font-semibold">
                { servicio.estado === "assign" && (
                    <div className="flex items-center px-3 py-1 bg-mutedColor-foreground rounded-full">
                        <p className="px-3">{estadosServicios[servicio.estado as EstadoServicio]} {' '}</p>
                        <CalendarIcon className="size-6 inline-block"/>
                    </div>
                )}

                { servicio.estado === "inProgress" && (
                    <div className="flex items-center px-3 py-1 bg-primaryColor rounded-full">
                        <p className="px-3">{estadosServicios[servicio.estado as EstadoServicio]} {' '}</p>
                        <PlayIcon className="size-6 inline-block"/>
                    </div>
                )}

                { servicio.estado === "noShow" && (
                    <div className="flex items-center px-3 py-1 bg-mutedColor-foreground rounded-full">
                        <p className="px-3">{estadosServicios[servicio.estado as EstadoServicio]} {' '}</p>
                        <NoSymbolIcon className="size-6 inline-block"/>
                    </div>
                )}

                { servicio.estado === "complete" && (
                    <div className="flex items-center px-3 py-1 bg-lime-500 rounded-full">
                        <p className="px-3">{estadosServicios[servicio.estado as EstadoServicio]} {' '}</p>
                        <HandThumbUpIcon className="size-6 inline-block" />
                    </div>
                )}
            </div>

            <div className="flex flex-col md:justify-end">
                <p className="font-semibold">Fecha de Ejecución: {' '}
                    <span className="font-normal">{formatDate(servicio.fechaEjecucion)}</span>
                </p>

                <p className="font-semibold">Orden de Servicio: {' '}
                    <span className="font-normal">#{servicio.ordenServicio.id}</span>
                </p>                
            </div>

            <div className="md:col-span-3 grid gap-2 font-semibold">                
                <p>Conductor Asignado: {' '}
                    <span className="font-normal">{servicio.idConductor.nombre} {servicio.idConductor.apellido}</span>
                </p>

                <p>Tipo de Servicio: {' '}
                    <span className="font-normal">{tipoServicio[servicio.tipoServicio as TipoServicio]}</span>
                </p>
            </div>


            <div className="md:col-span-3">
                <p className="font-semibold">Descripción del Servicio:</p>
                <p className="text-mutedColor-foreground bg-accentColor py-2 px-1 rounded-lg">{servicio.descripcion}</p>
            </div>

            <div className="md:col-span-3">
                <p className="font-semibold">Nota:</p>
                <p className="text-mutedColor-foreground">{servicio.descripcion}</p>
            </div>

            <div className="md:col-start-3 flex justify-end gap-5">
                <div className="font-semibold flex flex-col justify-end">
                    <p>Costo:</p>
                </div>

                <div className="text-right">
                    <p className="font-bold text-2xl ">{formatCurrency(servicio.costo)}</p>
                </div>
            </div>
        </div>
    )
}