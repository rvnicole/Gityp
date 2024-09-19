import { useSearchParams } from "next/navigation";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { evalDate, formatDate } from "@/src/lib";
import { ServiceFormData } from "@/src/types";
import { tiposServicio } from "@/src/data/data";
import { Dispatch, SetStateAction } from "react";

type ListServicesProps = {
    servicio: ServiceFormData,
    setServicioEdit: Dispatch<SetStateAction<ServiceFormData>>,
    servicios: ServiceFormData[],
    setServicios: Dispatch<SetStateAction<ServiceFormData[]>>
}

export default function ServicesData( { servicio, setServicioEdit, servicios, setServicios }: ListServicesProps ){
    const { fechaEjecucion } = servicio;
    const fecha = evalDate(fechaEjecucion);    

    const handleEditService = (servicio: ServiceFormData) => {
        console.log(servicio, 'Serivico para editar');
        setServicioEdit( {...servicio} );
    };

    const handleDeleteService = (servicio: ServiceFormData) => {
        const updateServices = servicios.filter( serv => serv.id !== servicio.id );
        setServicios([...updateServices]);
    }

    return (
        <>
            
                <span className="bg-accentColor p-3"><span className="md:hidden font-bold"></span>{formatDate(new Date(fecha))}</span>
                { /*
                <input 
                    readOnly 
                    type="text" 
                    value={servicio.idConductor}
                    className="text-center bg-accentColor"
                /> 
                */
                }
                <span className="text-center bg-accentColor p-3"><span className="md:hidden font-bold">Tipo: </span>{tiposServicio.find((serv)=> servicio.tipoServicio === serv.value)!.tipo}</span>
                <span className="bg-accentColor break-words py-3"><span className="md:hidden font-bold">Descripción: </span>{servicio.descripcion}</span>
                <span className="text-center bg-accentColor p-3"><span className="md:hidden font-bold">Costo: </span>{servicio.costo}</span>
                <span className="bg-accentColor py-3"><span className="md:hidden font-bold">Nota: </span>{servicio.nota}</span>
                <div className="flex justify-center items-center gap-2 text-center bg-accentColor p-3">
                    <a onClick={() => handleEditService(servicio)}>
                        <PencilSquareIcon className="size-7 text-charColor-char4 hover:text-primaryColor cursor-pointer"/>
                    </a>
                    <a onClick={() => handleDeleteService(servicio)}>
                        <XCircleIcon className="size-7 text-destructiveColor hover:text-destructiveColor-hover cursor-pointer"/>
                    </a>
                </div>
                <hr className="md:hidden p-1 my-3 bg-mutedColor-foreground rounded-lg"/>
        </>
    )
}