import { getConductoresAction } from "@/actions/conductor-actions"
import { getEmisorReceptor } from "@/actions/emisor-receptor-actions"
import { Conductores, EmisoresReceptores, EmisorReceptor, FacturaFormData } from "@/src/types"
import { ChangeEvent, useEffect, useState } from "react"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type FacturaFormProps = {
    register: UseFormRegister<FacturaFormData>
    errors: FieldErrors<FacturaFormData>
}

export default function FacturaForm({register, errors}: FacturaFormProps){
    const [ emisores, setEmisores ] = useState<EmisorReceptor[]>([]);
    const [ receptores, setReceptores ] = useState<EmisorReceptor[]>([]);
    const [ rfcs, setRfcs ] = useState({ rfcEmisor: '', rfcReceptor: '' });

    useEffect(()=>{
        const fetchEntidades = async () => {
            const emisoresReceptores = await getEmisorReceptor() || [];
            if( "success" in emisoresReceptores ){
                return;
            }
            console.log(emisoresReceptores);
            let em: EmisorReceptor[] = [];
            let rec: EmisorReceptor[] = [];
            emisoresReceptores.forEach( entidad => entidad.tipo === 'emisor' ? em.push(entidad) : rec.push(entidad));
            
            setEmisores(em);
            setReceptores(rec);
        };        
        fetchEntidades();
    },[]);


    const handleChangeEmisor = (e: ChangeEvent<HTMLSelectElement>) => {
        const emisorRfc = emisores.find( em => em.id === e.target.value );
        if( emisorRfc ){
            setRfcs({ ...rfcs, rfcEmisor: emisorRfc.rfc });
            return;
        };
        setRfcs({ ...rfcs, rfcEmisor: '' })
    } 

    const handleChangeReceptor = (e: ChangeEvent<HTMLSelectElement>) => {
        const receptorRfc = receptores.find( rec => rec.id === e.target.value );
        if( receptorRfc ){
            setRfcs({ ...rfcs, rfcReceptor: receptorRfc.rfc });
            return;
        };
        setRfcs({ ...rfcs, rfcReceptor: '' })
    } 
    

    return (
        <>
            <div className="px-5 mt-5 flex flex-col">
                <div className="flex items-center">
                    <label htmlFor="fecha">Fecha sellado: </label>
                    <span className="p-1 text-destructiveColor">*</span> 
                </div>
                 
                <input 
                    id="fechaSellado"
                    type="date" 
                    className={`w-full md:w-1/4 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.fechaSellado && "border-2 border-destructiveColor"}`}
                    { ...register('fechaSellado', {
                        required: true
                    })}
                />
                              
            </div>
            <div className="px-5">
                <label htmlFor="folio-fiscal">Folio Fiscal</label>
                <span className="p-1 text-destructiveColor">*</span>
                    <input 
                        type="text" 
                        className={`text-foregroundColor font-bold w-full p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.folioFiscal && "border-2 border-destructiveColor"}`}
                        { ...register('folioFiscal', {
                            required: true
                        })}
                    />                    
            </div>
            <div className="px-5">
                <label htmlFor="emisor">Emisor:</label>
                <div className="p-5 space-y-5">
                    <select 
                        id="emisor"
                        className={`w-full md:w-auto text-foregroundColor p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.emisor && "border-2 border-destructiveColor"}`}
                        { ...register('emisor.id', {
                            required: true
                        })}
                        onChange={(e) => handleChangeEmisor(e)}
                    >
                        <option value="">--- Seleccione ---</option>
                        {
                            emisores.map( emisor => 
                                <option key={emisor.id} value={emisor.id} className="w-full md:w-auto text-foregroundColor">{emisor.nombre}</option>
                            )
                        }
                    </select>
                    <div>
                        <label htmlFor="rfcEmisor">RFC: </label>
                        <input 
                            id="rfcEmisor" 
                            type="text" 
                            readOnly 
                            disabled={true}
                            value={rfcs.rfcEmisor} 
                            className="w-full md:w-auto text-foregroundColor font-bold"
                        />
                    </div>
                </div>
            </div>
            <div className="px-5">
                <label htmlFor="receptor">Receptor:</label>
                <div className="p-5 space-y-5">
                    <select 
                        id="receptor"
                        className={`w-full md:w-auto p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.receptor && "border-2 border-destructiveColor"}`}
                        { ...register('receptor.id', {
                            required: true
                        })}
                        onChange={(e) => handleChangeReceptor(e)}
                    >
                        <option value="">--- Seleccione ---</option>
                        {
                            receptores.map( receptor => 
                                <option key={receptor.id} value={receptor.id} className="w-full md:w-auto">{receptor.nombre}</option>
                            )
                        }
                    </select>
                    <div>
                        <label htmlFor="rfcReceptor">RFC: </label>
                        <input 
                            id="rfcReceptor" 
                            type="text" 
                            readOnly 
                            disabled={true}
                            value={rfcs.rfcReceptor}
                            className="w-full md:w-auto text-foregroundColor font-bold"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}