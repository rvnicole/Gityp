import { useMemo } from "react";
import { useForm } from "react-hook-form";
import ServicioForm from "./ServicioForm";
import { ServiceFormData, Servicio } from "@/src/types";
import Link from "next/link";
import { PrimaryButton } from "../../ui/Buttons";
import { deleteServicio, updateServicio } from "@/actions/servicio-actions";
import { useRouter } from "next/navigation";

type EditServiceProps = {
    defaultValues: Servicio
}

export default function EditService({defaultValues}: EditServiceProps){
    const dataListOrdenes = useMemo(()=>{},[]);
    const  { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormData & { searchOrdenes?: string }>({
        defaultValues
    });
    const router = useRouter();

    const handleServiceFormData = async (formData: ServiceFormData & { searchOrdenes?: string }) => {
        /*const respuesta = await updateServicio(formData);
        
        if( respuesta.success ) {
            alert(respuesta.message);
        }
        else {
            alert(respuesta.message);
        }

        reset();
        router.push(location.pathname);*/

        await deleteServicio(formData.id);
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