import { useMemo } from "react";
import { useForm } from "react-hook-form";
import ServicioForm from "./ServicioForm";
import { ServiceFormData } from "@/src/types";
import Link from "next/link";
import { PrimaryButton } from "../../ui/Buttons";

export default function EditService(){
    const dataListOrdenes = useMemo(()=>{},[]);
    const  { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormData & { searchOrdenes?: string }>();

    const handleCloseForm = () => {

    };

    const handleServiceFormData = () => {

    };

    return(
        <form
            onSubmit={handleSubmit(handleServiceFormData)}
        >
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