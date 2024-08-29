import { Conductores } from "@/src/types";
import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryButton } from "../../ui/Buttons";
import Link from "next/link";
import { createConductor } from "@/actions/conductor-actions";
import { useRouter } from "next/navigation";

export default function ConductoresForm(){
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Conductores>();
    const router = useRouter();

    const handleGuardar = async (formData: Conductores) => {
        const res = await createConductor(formData);
        if( res.success ){
            alert(res.message);
        }
        else{
            alert(`Error al crear conductor: ${res.message}`);
        }
        
        router.refresh();
        router.push(location.pathname);
    };

    return(
        <form
            className="mt-5 space-y-5"
            onSubmit={handleSubmit(handleGuardar)}
        >
            <div>
                <label className="text-foregroundColor" htmlFor="nombre">Nombre: </label>
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
                <label className="text-foregroundColor" htmlFor="apellido">Apellido: </label>
                <input 
                    id="apellido"
                    type="text" 
                    className={`w-full sm:w-64 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.apellido && "border-2 border-destructiveColor"}`}
                    { ...register('apellido') }
                />
            </div>
            <div>
                <label className="text-foregroundColor" htmlFor="edad">Edad: </label>
                <input 
                    id="edad"
                    type="number" 
                    className={`w-12 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.edad && "border-2 border-destructiveColor"}`}
                    { ...register('edad') }
                />
            </div>
            <div>
                <label className="text-foregroundColor" htmlFor="licencia">Licencia: </label>
                <input 
                    id="licencia"
                    type="text" 
                    className={`w-full sm:w-64 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.licencia && "border-2 border-destructiveColor"}`}
                    { ...register('licencia') }
                />
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