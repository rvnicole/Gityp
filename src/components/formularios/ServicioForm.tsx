import { tiposServicio, estadosServicio } from "@/src/data/data"

export default function ServicioForm(){
    return (

        <fieldset className="px-5 border border-slate-200">
                <legend className="font-bold">Servicio(s): </legend>
                <div className="p-3 space-y-5">
                    <div>
                        <label htmlFor="fecha-ejecucion">Fecha de ejecución del servicio: </label>
                        <input id="fecha-ejecucion" type="date" className="p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor"/>
                    </div>
                    <div>
                        <label htmlFor="descripcion">Descripción: </label>
                        <input id="descripcion" type="text" className="p-1 border border-borderColor placeholder:text-inputColor rounded w-full focus:outline-none focus:ring-2 focus:border-ringColor" />
                    </div>
                    <div className="flex justify-between ">
                        <div>
                            <label htmlFor="conductor">Conductor: </label>
                            <select name="" id="conductor" className="p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor">
                                <option value="">-- Seleccione ---</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="conductor">Tipo: </label>
                            <select name="" id="conductor" className="p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor">
                                <option value="">-- Seleccione ---</option>
                                {
                                    tiposServicio.map( tipo =>  
                                        <option key={tipo.value} value={tipo.value}>{tipo.tipo}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="conductor">Estado: </label>
                            <select name="" id="conductor" className="p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor">
                                {
                                    estadosServicio.map( estado => 
                                        <option key={estado.value} value={estado.value}>{estado.estado}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>                    
                    <div>
                        <label htmlFor="costo">Costo: </label>
                        <input type="number" className="p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor"/>
                    </div> 
                    <div>
                        <label htmlFor="costo">Nota: </label>
                        <input type="text" className="p-1 border border-borderColor placeholder:text-inputColor rounded w-full focus:outline-none focus:ring-2 focus:border-ringColor"/>
                    </div>
                </div>                
        </fieldset>
        
    )
}