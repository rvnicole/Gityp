import { GestionCobroFormData } from "@/src/types"
import Link from "next/link";
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../../ui/Buttons";
import GestionCobroForm from "./GestionCobroForm";

type EditGestionCobroProps = {
    defaultValues: GestionCobroFormData
}

export default function EditGestionCobro({defaultValues}: EditGestionCobroProps){
    const { register, handleSubmit, reset, formState: { errors } } = useForm<GestionCobroFormData>( defaultValues && {defaultValues});

    const handleEdit = (formData: GestionCobroFormData) => {
        console.log(formData);
    };

    return (
        <form 
            onSubmit={handleSubmit(handleEdit)}
            className="mt-5 space-y-5 text-mutedColor-foreground"
        >
            <GestionCobroForm 
                register={register}
                errors={errors}
            />
            <div className="flex justify-center flex-col sm:justify-end sm:flex-row gap-5 p-5">
                <Link 
                    href={`${location.pathname}`}
                    className="text-center bg-secondaryColor hover:bg-secondaryColor-hover text-secondaryColor-foreground border border-secondaryColor hover:border-secondaryColor-hover py-1 px-3 rounded cursor-pointer"
                >
                        Cancelar
                </Link>
                <PrimaryButton>Guardar</PrimaryButton>
            </div>
        </form>
    )
}