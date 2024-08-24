import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { formatDate } from "@/src/lib";
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

    const handleEditService = (servicio: ServiceFormData) => {
        setServicioEdit( {...servicio} );
        console.log('editando...', servicio)
    };

    const handleDeleteService = (servicio: ServiceFormData) => {
        const updateServices = servicios.filter( serv => serv.id !== servicio.id );
        setServicios([...updateServices]);
    }

    return (
        <>
            
                <span className="bg-accentColor p-3">{formatDate(new Date(servicio.fechaEjecucion))}</span>
                { /*
                <input 
                    readOnly 
                    type="text" 
                    value={servicio.idConductor}
                    className="text-center bg-accentColor"
                /> 
                */
                }
                <span className="text-center bg-accentColor p-3">{tiposServicio.find((serv)=> servicio.tipoServicio === serv.value)!.tipo}</span>
                <span className="bg-accentColor break-words py-3">{servicio.descripcion}</span>
                <span className="text-center bg-accentColor p-3">{servicio.costo}</span>
                <span className="bg-accentColor py-3">{servicio.nota}</span>
                <div className="flex justify-center items-center gap-2 text-center bg-accentColor p-3">
                    <a onClick={() => handleEditService(servicio)}>
                        <PencilSquareIcon className="size-7 text-charColor-char4 hover:text-primaryColor cursor-pointer"/>
                    </a>
                    <a onClick={() => handleDeleteService(servicio)}>
                        <XCircleIcon className="size-7 text-destructiveColor hover:text-destructiveColor-hover cursor-pointer"/>
                    </a>
                </div>
        </>
    )
}