import { useMemo } from "react";
import { useForm } from "react-hook-form";
import ServicioForm from "./ServicioForm";
import { ServiceFormData } from "@/src/types";
import { PrimaryButton } from "../../ui/Buttons";
import Link from "next/link";

export default function AddService(){
    const dataListOrdenes = useMemo(()=>{},[]);
    const  { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormData & { searchOrdenes?: string }>();

    const handleServiceFormData = () => {

    };

    return(
        <form
            onSubmit={handleSubmit(handleServiceFormData)}
            className="mt-5 space-y-5"
        >
            <div>
                <label htmlFor="ordenesServicio">Orden de servicio: </label>
                <input 
                    id="searchOrdenes"
                    type="search" 
                    list="ordenesServicio" 
                    autoComplete="on"
                    className={`p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.searchOrdenes && "border-2 border-destructiveColor"}`}
                    { ...register('searchOrdenes',{
                        required: true
                    })}
                />
                <datalist id="ordenesServicio">
                    <option value="valores"></option>
                </datalist>
                <span className="p-1 text-destructiveColor">*</span>
            </div>
            <ServicioForm 
                register={register}
                errors={errors}
            >
                <PrimaryButton>Crear servicio</PrimaryButton>
                <Link
                    href={`${location.pathname}`}
                    className="bg-secondaryColor hover:bg-secondaryColor-hover text-secondaryColor-foreground border border-secondaryColor hover:border-secondaryColor-hover py-1 px-3 rounded cursor-pointer"
                >
                        Cancelar
                </Link>
            </ServicioForm>
        </form>
    )
}