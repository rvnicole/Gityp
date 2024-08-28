import { Conductores, EmisoresReceptores } from "@/src/types";
import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryButton } from "../../ui/Buttons";
import Link from "next/link";

export default function EmisorReceptorForm(){
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EmisoresReceptores & { "emisor-receptor": string }>();

    const handleGuardar = (formData: EmisoresReceptores) => {
        console.log(formData);
    };

    return(
        <form
            className="mt-5 space-y-5"
            onSubmit={handleSubmit(handleGuardar)}
        >
            <div>
                <label className="text-foregroundColor" htmlFor="nombre">Razón social: </label>
                <input 
                    id="nombre"
                    type="text" 
                    className={`w-full sm:w-64 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.nombre && "border-2 border-destructiveColor"}`}
                    { ...register('nombre',{
                        required: true
                    })}
                />
            </div>
            <div>
                <label className="text-foregroundColor" htmlFor="apellido">RFC: </label>
                <input 
                    id="rfc"
                    type="text" 
                    className={`w-full sm:w-64 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.rfc && "border-2 border-destructiveColor"}`}
                    { ...register('rfc',{
                        required: true
                    })}
                />
            </div>
            <div>
                <label className="text-foregroundColor" htmlFor="apellido">Tipo: </label>
                <select  
                    id="emisor-receptor"
                    className={`w-full sm:w-64 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors['emisor-receptor'] && "border-2 border-destructiveColor"}`}
                    { ...register('emisor-receptor', {
                        required: true
                    })}
                >
                    <option value="">--- Seleccione ---</option>
                    <option value="emisor">Emisor</option>
                    <option value="receptor">Receptor</option>
                </select>
            </div>
            <div className="flex flex-col justify-center sm:flex-row sm:justify-end gap-5">
                <Link 
                    href={location.pathname}
                >
                    <SecondaryButton attributes={{ className: "text-center w-full bg-secondaryColor hover:bg-secondaryColor-hover text-secondaryColor-foreground border border-secondaryColor hover:border-secondaryColor-hover py-1 px-3 rounded" }}>Cancelar</SecondaryButton>
                </Link>
                <PrimaryButton>Crear</PrimaryButton>
            </div>
        </form>
    );
}