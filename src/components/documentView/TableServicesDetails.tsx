import { evalDate, formatCurrency, formatDate } from "@/src/lib";
import { estadosServicios, tipoServicio } from "@/src/data/data";
import { EstadoServicio, Servicio, TipoServicio } from "@/src/types";

type TableServicesDetailsProps = {
    services: Servicio[];
}

export default function TableServicesDetails({ services }: TableServicesDetailsProps) {
    
    return (
        <div className="w-full text-sm">
            <div className="hidden lg:block">
                <div 
                    id='imp-title-colums'
                    className="grid grid-cols-11 gap-1 mt-2 px-2 py-3 font-bold border-b border-borderColor"
                >
                    <p className="my-auto imp-columns">ID</p>
                    <p className="my-auto text-center">Tipo de Servicio</p>
                    <p className="my-auto text-center">Fecha de Ejecución</p>
                    <p className="my-auto text-center imp-columns">Conductor Asignado</p>
                    <p className="my-auto col-span-3">Descripción</p>
                    <p className="my-auto col-span-2">Nota</p>
                    <p className="my-auto text-right">Costo</p>
                    <p className="my-auto text-center imp-columns">Estado</p>
                </div>
            </div>
            
            {
                services.map((service, indice) => (
                    <div 
                        id='imp-data-table'
                        key={service.id} 
                        className={`${indice % 2 == 0 && 'bg-secondaryColor'} flex flex-col lg:grid lg:grid-cols-11 gap-1 p-1 border-b border-borderColor`}
                    >
                        <p className="my-auto break-words imp-columns">
                            <span className="block lg:hidden py-1 font-bold mt-1">ID: </span>
                            {service.id}
                        </p>
                        <p className="my-auto lg:text-center">
                            <span className="block lg:hidden py-1 font-bold mt-1">Tipo de Servicio: </span>
                            {tipoServicio[service.tipoServicio as TipoServicio]}
                        </p>
                        <p className="my-auto lg:text-center">
                            <span className="block lg:hidden py-1 font-bold mt-1">Fecha de Ejecución: </span>
                            {formatDate(new Date(evalDate(service.fechaEjecucion)))}
                        </p>
                        <p className="my-auto lg:text-center imp-columns">
                            <span className="block lg:hidden py-1 font-bold mt-1">Conductor Asignado: </span>
                            {service.idConductor.nombre}
                        </p>
                        <p className="my-auto col-span-3">
                            <span className="block lg:hidden py-1 font-bold mt-1">Descripción: </span>
                            {service.descripcion}
                        </p>
                        <p className="my-auto col-span-2">
                            <span className="block lg:hidden py-1 font-bold mt-1">Nota: </span>
                            {service.nota}
                        </p>
                        <p className="my-auto lg:text-right">
                            <span className="block lg:hidden py-1 font-bold mt-1">Costo: </span>
                            {formatCurrency(service.costo)}
                        </p>
                        <p className="my-auto lg:text-center imp-columns">
                            <span className="block lg:hidden py-1 font-bold mt-1">Estado: </span>
                            {estadosServicios[service.estado as EstadoServicio]}
                        </p>
                    </div>
                ))
            }
        
        </div>
    )
}