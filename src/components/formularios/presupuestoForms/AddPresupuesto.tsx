import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { PresupuestoFormData, ServiceFormData } from "@/src/types";
import { PrimaryButton } from "../../ui/Buttons";
import { formatCurrency } from "@/src/lib";
import PresupuestoForm from "./PresupuestoForm";
import Link from "next/link";

const montosIniciales = {
    subtotal: 0,
    iva: 16,
    total: 0
}

export default function AddPresupuesto(){
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
                <label htmlFor="comentarios">Comentarios:</label>
                <textarea 
                    className="p-1 border border-borderColor placeholder:text-inputColor rounded w-full focus:outline-none focus:ring-2 focus:border-ringColor"
                    { ...register('comentarios')}
                />
            </div>
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
                <Link 
                    href={`${location.pathname}`}
                    className="bg-secondaryColor hover:bg-secondaryColor-hover text-secondaryColor-foreground border border-secondaryColor hover:border-secondaryColor-hover py-1 px-3 rounded cursor-pointer"
                >
                        Cancelar
                </Link>
                <PrimaryButton>Crear presupuesto</PrimaryButton>
            </div>
        </form>
    )
}