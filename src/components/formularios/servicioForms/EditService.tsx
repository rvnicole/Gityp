import { useMemo } from "react";
import { useForm } from "react-hook-form";
import ServicioForm from "./ServicioForm";
import { ServiceFormData, Servicio } from "@/src/types";
import Link from "next/link";
import { PrimaryButton } from "../../ui/Buttons";

type EditServiceProps = {
    defaultValues: Servicio
}

export default function EditService({defaultValues}: EditServiceProps){
    const dataListOrdenes = useMemo(()=>{},[]);
    const  { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormData & { searchOrdenes?: string }>({
        defaultValues
    });

    const handleServiceFormData = (formData: ServiceFormData & { searchOrdenes?: string }) => {
        console.log(formData);
    };

    return(
        <form
            onSubmit={handleSubmit(handleServiceFormData)}
        >
            <div className="mb-5"></div>
            <ServicioForm 
                register={register}
                errors={errors}
            >
                <PrimaryButton>Guardar</PrimaryButton>
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