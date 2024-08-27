import { FacturaFormData } from "@/src/types"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type FacturaFormProps = {
    register: UseFormRegister<FacturaFormData>
    errors: FieldErrors<FacturaFormData>
}

export default function FacturaForm({register, errors}: FacturaFormProps){
    

    return (
        <>
            <div className="px-5 mt-5">
                <label htmlFor="fecha">Fecha sellado: </label>
                <input 
                    id="fechaSellado"
                    type="date" 
                    className={`p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.fechaSellado && "border-2 border-destructiveColor"}`}
                    { ...register('fechaSellado', {
                        required: true
                    })}
                />
                <span className="p-1 text-destructiveColor">*</span>                
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
                        className={`text-foregroundColor p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.emisor && "border-2 border-destructiveColor"}`}
                        { ...register('emisor.id', {
                            required: true
                        })}
                    >
                        <option value="1" className="text-foregroundColor">Eduardo Reynoso Gonzalez</option>
                    </select>
                    <div>
                        <label htmlFor="rfcEmisor">RFC: </label>
                        <input 
                            id="rfcEmisor" 
                            type="text" 
                            readOnly 
                            disabled={true}
                            value={'REGE6003152Q7'} 
                            className="text-foregroundColor font-bold"
                        />
                    </div>
                </div>
            </div>
            <div className="px-5">
                <label htmlFor="receptor">Receptor:</label>
                <div className="p-5 space-y-5">
                    <select 
                        id="receptor"
                        className={`p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.receptor && "border-2 border-destructiveColor"}`}
                        { ...register('receptor.id', {
                            required: true
                        })}
                    >
                        <option value="2">Unilever de México</option>
                    </select>
                    <div>
                        <label htmlFor="rfcReceptor">RFC: </label>
                        <input 
                            id="rfcReceptor" 
                            type="text" 
                            readOnly 
                            disabled={true}
                            value={'UMEE6003152Q7'}
                            className="text-foregroundColor font-bold"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}