import { getConductoresAction } from "@/actions/conductor-actions";
import { estadosServicio, tiposServicio } from "@/src/data/data";
import { ConductoresArrSchema } from "@/src/schema";
import { Conductores, ServiceFormData } from "@/src/types";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type ServicioFormProps = {
    register: UseFormRegister<ServiceFormData>,
    errors: FieldErrors<ServiceFormData>,
    children: JSX.Element[]
};

export default function ServicioForm({ register, errors, children  }: ServicioFormProps){
    const [ conductores, setConductores ] = useState<Conductores[]>([]);

    const handleSelectDrivers = async () => {
        const conductores = await getConductoresAction();
        const result = ConductoresArrSchema.safeParse(conductores);
        if( result.success ){
            setConductores(result.data);
        };
    }

    return (
        <fieldset className="px-5 border border-slate-200">
                <legend className="font-bold">Servicio: </legend>
                <div className="p-3 space-y-5">
                    <div className="flex flex-col md:flex-row md:items-center">
                        <div className="flex items-center">
                            <label htmlFor="fecha-ejecucion">Fecha de ejecución del servicio: </label>
                            <span className="inline text-destructiveColor p-2">*</span>
                        </div>
                        <input 
                            id="fecha-ejecucion" 
                            type="date" 
                            className={`p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.fechaEjecucion && "border-2 border-destructiveColor"}`}
                            { ...register('fechaEjecucion',{
                                required: true
                            })}
                        />
                        
                    </div>
                    <div>
                        <label htmlFor="descripcion">Descripción: </label>
                        <span className="inline text-destructiveColor p-2">*</span>
                        <input 
                            id="descripcion" 
                            type="text" 
                            className={`p-1 w-full border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.descripcion && "border-2 border-destructiveColor"}`}
                            { ...register('descripcion',{
                                required: true
                            })}
                        />                        
                    </div>
                    <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row lg:justify-between ">
                        <div className="flex flex-col md:flex-row md:items-center">
                            <div className="flex items-center">
                                <label htmlFor="conductor">Conductor: </label>
                                <span className="inline text-destructiveColor p-2">*</span>
                            </div>
                            <select
                                id="idConductor"
                                onClick={handleSelectDrivers} 
                                className={`w-full md:w-auto p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.idConductor && "border-2 border-destructiveColor"}`}
                                { ...register('idConductor',{
                                    required: true
                                })}
                            >
                                <option key={0} value=''>-- Seleccione ---</option>
                                {
                                    conductores.length > 0 ? 
                                        conductores.map( conductor =>
                                            <option 
                                                key={conductor.id}
                                                value={conductor.id}
                                            >
                                                {conductor.nombre} {' '} {conductor.apellido}
                                            </option>
                                        )
                                    :
                                    <option value="">
                                        Cargando...
                                    </option>
                                }
                            </select>                            
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center">
                            <div className="flex items-center">
                                <label htmlFor="conductor">Tipo: </label>
                                <span className="inline text-destructiveColor p-2">*</span>
                            </div>
                            <select 
                                id="tipo-servicio" 
                                className={`p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.tipoServicio && "border-2 border-destructiveColor"}`}
                                { ...register('tipoServicio',{
                                    required: true
                                })}
                            >
                                <option value="">-- Seleccione ---</option>
                                {
                                    tiposServicio.map( tipo =>  
                                        <option key={tipo.value} value={tipo.value}>{tipo.tipo}</option>
                                    )
                                }
                            </select>
                            
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center">
                            <div className="flex items-center">
                                <label htmlFor="conductor">Estado: </label>
                                <span className="inline text-destructiveColor p-2">*</span>
                            </div>
                            <select
                                id="estado" 
                                className={`p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.estado && "border-2 border-destructiveColor"}`}
                                { ...register('estado')}
                            >
                                {
                                    estadosServicio.map( estado => 
                                        <option key={estado.value} value={estado.value}>{estado.estado}</option>
                                    )
                                }
                            </select>                            
                        </div>
                    </div>                    
                    <div className="flex flex-col md:flex-row md:items-center">
                            <div className="flex items-center">
                                <label htmlFor="costo">Costo: </label>
                                <span className="inline text-destructiveColor p-2">*</span>
                            </div>
                        <input 
                            type="number" 
                            className={`p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.costo && "border-2 border-destructiveColor"}`}
                            { ...register('costo',{
                                required: true
                            })}
                        />                        
                    </div> 
                    <div>
                        <label htmlFor="costo">Nota: </label>
                        <input 
                            id="nota"
                            type="text" 
                            className="p-1 border border-borderColor placeholder:text-inputColor rounded w-full focus:outline-none focus:ring-2 focus:border-ringColor"
                            { ...register('nota') }
                        />
                    </div>
                    <div className="flex justify-start gap-5 flex-row-reverse">
                        { children }                       
                    </div>                 
                </div>                
        </fieldset>
    )
}