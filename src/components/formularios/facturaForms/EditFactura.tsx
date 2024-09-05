import { Factura, FacturaFormData } from "@/src/types"
import Link from "next/link";
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../../ui/Buttons";
import FacturaForm from "./FacturaForm";
import { updateFactura } from "@/actions/factura-actions";
import { useRouter } from "next/navigation";

type FacturaFormProps = {
    defaultValues: Factura
}

export default function EditFactura({defaultValues}: FacturaFormProps){
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FacturaFormData>( defaultValues && {defaultValues});

    const handleEdit = async ( formData: FacturaFormData ) => {
        console.log(formData);
        const res = await updateFactura( formData, defaultValues.id );
        alert(res.message);
        router.refresh();
        router.push(location.pathname);
    };

    return (
        <form 
            onSubmit={handleSubmit(handleEdit)}
            className="space-y-5 text-mutedColor-foreground"
        >
            <FacturaForm 
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