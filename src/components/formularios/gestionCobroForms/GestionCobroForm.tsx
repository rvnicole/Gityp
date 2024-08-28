import { GestionCobroFormData } from "@/src/types"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type GestionCobroFormProps = {
    register: UseFormRegister<GestionCobroFormData>
    errors: FieldErrors<GestionCobroFormData>
}

export default function GestionCobroForm({ register, errors }: GestionCobroFormProps){
    return (
        <>
            <div>
                <label htmlFor="ie">Número de IE: </label>
                <span className="text-destructiveColor">*</span>
                <input 
                    id="ie" 
                    type="text" 
                    className={`block p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.ie && "border-2 border-destructiveColor"}`}
                    { ...register('ie',{
                        required: true
                    })}
                />                
            </div>
            <div>
                <input 
                    id="edicom" 
                    type="checkbox" 
                    className=" scale-150 ml-1"
                    { ...register('edicom',{
                        required: true
                    })}
                />
                <label htmlFor="edicom" className="px-2"> Cargado a Edicom</label>                
            </div>
            <div className="space-y-5">
                <label htmlFor="comentarios" className="">Comentarios: </label> 
                <textarea 
                    id="comentarios" 
                    className={`w-full block p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.comentarios && "border-2 border-destructiveColor"}`}
                    { ...register('comentarios')}
                />               
            </div>
        </>
    )
}