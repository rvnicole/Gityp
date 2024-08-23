import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PresupuestoFormData, ServiceFormData } from "@/src/types";
import { PrimaryButton, SecondaryButton } from "../ui/Buttons";
import { formatCurrency } from "@/src/lib";
import PresupuestoForm from "./PresupuestoForm";

const montosIniciales = {
    subtotal: 0,
    iva: 16,
    total: 0
}

export default function AddPresupuesto(){
    const router = useRouter();
    const [ servicios, setServicios ] = useState<ServiceFormData[]>([]);
    const [ openServiceForm, setOpenServiceForm ] = useState(true);
    const [ montos, setMontos ] = useState(montosIniciales); 
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<PresupuestoFormData>();
    const iva = watch('iva') ? watch('iva') : montos.iva;
    useMemo(()=>{ 
        const subtotal = servicios.reduce((acumulado, servicio) => acumulado + +servicio.costo, 0);
        setMontos({...montosIniciales, subtotal, iva, total: subtotal * iva/100 + subtotal }); 
    } , [servicios, iva]);

    const handleAdd = ( formData: PresupuestoFormData ) => {
        if( servicios.length < 1 ){
            alert('Debe agregar al menos un servicio');
            return;
        };
        const fullFormData = {
            formData,
            servicios
        };
        console.log(fullFormData);
        // AQUI SE LLAMA AL ACTION
    };

    return (
        <form 
            onSubmit={handleSubmit(handleAdd)}
            className="mt-10 space-y-5"
        >
            <PresupuestoForm 
                register={register}
                errors={errors}
                servicios={servicios}
                setServicios={setServicios}
                openServiceForm={openServiceForm}
                setOpenServiceForm={setOpenServiceForm}
            />
            <div className="px-5">
                <label htmlFor="subtotal">Subtotal: </label>
                <input 
                    readOnly 
                    type="text" 
                    className="p-1 placeholder:text-inputColor rounded w-24"
                    value={formatCurrency(montos.subtotal)}
                    { ...register('subtotal')}
                />
            </div>
            <div className="px-5">
                <label htmlFor="iva">IVA: </label>
                <input 
                    type="number" 
                    className={`w-16 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor`}
                    defaultValue={montos.iva}
                    { ...register('iva')}
                />
                <span>%</span>
            </div>
            <div className="px-5">
                <label htmlFor="total">Total: </label>
                <input 
                    readOnly 
                    type="text" 
                    className="p-1 placeholder:text-inputColor rounded w-24"
                    value={formatCurrency(montos.total)}
                    { ...register('total')}
                />
            </div>
            <div className="flex justify-end gap-5 px-5">
                <SecondaryButton onClick={() => router.replace('/')}>Cancelar</SecondaryButton>
                <PrimaryButton onClick={handleSubmit(handleAdd)}>Crear presupuesto</PrimaryButton>
            </div>
        </form>
    )
}