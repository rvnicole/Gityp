import { estadosServicio, tiposServicio } from "@/src/data/data";
import { ServiceFormData } from "@/src/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type ServicioFormProps = {
    register: UseFormRegister<ServiceFormData>,
    errors: FieldErrors<ServiceFormData>,
    children: JSX.Element[]
}

export default function ServicioForm({ register, errors, children  }: ServicioFormProps){

    return (
        <fieldset className="px-5 border border-slate-200">
                <legend className="font-bold">Servicio: </legend>
                <div className="p-3 space-y-5">
                    <div>
                        <label htmlFor="fecha-ejecucion">Fecha de ejecución del servicio: </label>
                        <input 
                            id="fecha-ejecucion" 
                            type="date" 
                            className={`p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.fechaEjecucion && "border-2 border-destructiveColor"}`}
                            { ...register('fechaEjecucion',{
                                required: true
                            })}
                        />
                        <span className="inline text-destructiveColor p-2">*</span>
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
                    <div className="flex justify-between ">
                        <div>
                            <label htmlFor="conductor">Conductor: </label>
                            <select
                                id="idConductor" 
                                className={`p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.idConductor && "border-2 border-destructiveColor"}`}
                                { ...register('idConductor',{
                                    required: true
                                })}
                            >
                                <option value="">-- Seleccione ---</option>
                                <option value="conductor">Eduardo</option>
                            </select>
                            <span className="inline text-destructiveColor p-2">*</span>
                        </div>
                        <div>
                            <label htmlFor="conductor">Tipo: </label>
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
                            <span className="inline text-destructiveColor p-2">*</span>
                        </div>
                        <div>
                            <label htmlFor="conductor">Estado: </label>
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
                            <span className="inline text-destructiveColor p-2">*</span>
                        </div>
                    </div>                    
                    <div>
                        <label htmlFor="costo">Costo: </label>
                        <input 
                            type="number" 
                            className={`p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.costo && "border-2 border-destructiveColor"}`}
                            { ...register('costo',{
                                required: true
                            })}
                        />
                        <span className="inline text-destructiveColor p-2">*</span>
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