import { FacturaFormData } from "@/src/types"
import Link from "next/link";
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../../ui/Buttons";
import FacturaForm from "./FacturaForm";
import { updateFactura } from "@/actions/factura-actions";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddFactura(){
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FacturaFormData>();
    const searchParams = useSearchParams();
    const facturaID = searchParams.get('documentID')!;

    const handleCompleteInfo = async (formData: FacturaFormData) => {
        console.log(formData);
        const res = await updateFactura( formData, facturaID );
        alert(res.message);
        router.refresh();
        router.push(location.pathname);
    };

    return (
        <form 
            onSubmit={handleSubmit(handleCompleteInfo)}
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
                <PrimaryButton>Completar</PrimaryButton>
            </div>
        </form>
    )
}