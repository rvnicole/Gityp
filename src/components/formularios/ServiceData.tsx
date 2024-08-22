import { formatDate } from "@/src/lib";
import { ServiceFormData } from "@/src/types";

type ListServicesProps = {
    servicio: ServiceFormData
}

export default function ServicesData( { servicio }: ListServicesProps ){
    return (
        <>
            
                <span className="bg-accentColor p-3">{formatDate(servicio.fechaEjecucion)}</span>
                { /*
                <input 
                    readOnly 
                    type="text" 
                    value={servicio.idConductor}
                    className="text-center bg-accentColor"
                /> 
                */
                }
                <span className="text-center bg-accentColor p-3">{servicio.tipoServicio}</span>
                <span className="bg-accentColor break-words p-3">{servicio.descripcion}</span>
                <span className="text-center bg-accentColor p-3">{servicio.costo}</span>
                <span className="bg-accentColor p-3">{servicio.nota}</span>
        </>
    )
}