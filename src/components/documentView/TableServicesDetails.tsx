import { evalDate, formatCurrency, formatDate } from "@/src/lib";
import { estadosServicios, tipoServicio } from "@/src/data/data";
import { EstadoServicio, Servicio, TipoServicio } from "@/src/types";

type TableServicesDetailsProps = {
    services: Servicio[];
}

export default function TableServicesDetails({ services }: TableServicesDetailsProps) {
    
    return (
        <div className="w-full text-sm">
            <div className="grid grid-cols-11 gap-1 mt-2 px-2 pb-3 font-bold border-b border-borderColor">
                <p className="my-auto">ID</p>
                <p className="my-auto text-center">Tipo de Servicio</p>
                <p className="my-auto text-center">Fecha de Ejecución</p>
                <p className="my-auto text-center">Conductor Asignado</p>
                <p className="my-auto col-span-3">Descripción</p>
                <p className="my-auto col-span-2">Nota</p>
                <p className="my-auto text-right">Costo</p>
                <p className="my-auto text-center">Estado</p>
            </div>

            {
                services.map((service, indice) => (
                    <div key={service.id} className={`${indice % 2 == 0 && 'bg-secondaryColor'} grid grid-cols-11 gap-1 p-1 border-b border-borderColor`}>
                        <p className="my-auto break-words">{service.id}</p>
                        <p className="my-auto text-center">{tipoServicio[service.tipoServicio as TipoServicio]}</p>
                        <p className="my-auto text-center">{formatDate(new Date(evalDate(service.fechaEjecucion)))}</p>
                        <p className="my-auto text-center">{service.idConductor.nombre}</p>
                        <p className="my-auto col-span-3">{service.descripcion}</p>
                        <p className="my-auto col-span-2">{service.nota}</p>
                        <p className="my-auto text-right">{formatCurrency(service.costo)}</p>
                        <p className="my-auto text-center">{estadosServicios[service.estado as EstadoServicio]}</p>
                    </div>
                ))
            }
        </div>
    )
}