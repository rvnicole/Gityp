import Link from "next/link";
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../../ui/Buttons";
import ErrorMessage from "../../Error";
import { OrdenServicio, OrdenServicioFormData } from "@/src/types";
import { updateOrdenServicio } from "@/actions/orden-servicio-actions";
import { useRouter } from "next/navigation";

type OrdenServicioFormProps = {
    defaultValues: OrdenServicio
}

export default function OrdenServicioForm({ defaultValues }: OrdenServicioFormProps){
    const { register, handleSubmit, reset, formState: { errors } } = useForm<OrdenServicioFormData>({
        defaultValues: {
            id: defaultValues.id,
            ordenCompra: defaultValues.ordenCompra,
            comentarios: defaultValues.comentarios
        }
    });

    const router = useRouter();

    const handleEdit = async ( formData: OrdenServicioFormData  ) => {
        const respuesta = await updateOrdenServicio(formData);

        if( respuesta.success ) {
            alert(respuesta.message);
        }
        else {
            alert(respuesta.message);
        }

        reset();
        router.push(location.pathname);
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit(handleEdit)}>
            <div className="p-5">
                <label htmlFor="">Número de Orden de Compra: </label>
                <input 
                    id="ordenCompra"
                    type="text" 
                    className={`w-full sm:w-64 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.ordenCompra && "border-2 border-destructiveColor"}`}
                    { ...register('ordenCompra', {
                        pattern: {
                            value: /PO[0-9]{8}/,
                            message: "Número de Orden de Compra inválido. Ejem. PO01234567"
                        },
                        required: "Ingrese el número de Orden de Compra. Ejem. PO01234567"
                    })}
                />
                <span className="p-1 text-destructiveColor">*</span>
            </div>

            <div className="px-5">
                <label htmlFor="comentarios">Comentarios:</label>
                <textarea
                    className="p-1 border border-borderColor placeholder:text-inputColor rounded w-full focus:outline-none focus:ring-2 focus:border-ringColor"
                    { ...register('comentarios')}
                />
            </div>

            <div className="px-5 flex justify-center sm:justify-start">
                { errors.ordenCompra && <ErrorMessage>{errors.ordenCompra.message?.toString()}</ErrorMessage> }
            </div>

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