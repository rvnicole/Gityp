import { useForm } from "react-hook-form";
import ServicioForm from "./ServicioForm";
import { ServiceFormData, Servicio } from "@/src/types";
import Link from "next/link";
import { PrimaryButton } from "../../ui/Buttons";
import { updateServicio } from "@/actions/servicio-actions";
import { toast } from 'react-toastify';

type EditServiceProps = {
    defaultValues: Servicio
}

export default function EditService({defaultValues}: EditServiceProps){
    const  { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormData & { searchOrdenes?: string }>({
        defaultValues
    });

    const handleServiceFormData = async (formData: ServiceFormData & { searchOrdenes?: string }) => {
        const respuesta = await updateServicio(formData);
        
        if( respuesta.success ) {
            toast.success(respuesta.message as string);
            reset();
            setTimeout(() => location.href = location.pathname, 2000);
        }
        else {
            toast.error(respuesta.message as string);
        }
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