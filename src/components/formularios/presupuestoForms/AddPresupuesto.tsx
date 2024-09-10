import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { PresupuestoFormData, ServiceFormData } from "@/src/types";
import { PrimaryButton } from "../../ui/Buttons";
import { formatCurrency } from "@/src/lib";
import PresupuestoForm from "./PresupuestoForm";
import Link from "next/link";
import { createPresupuesto } from "@/actions/presupuesto-actions";
import { toast } from 'react-toastify';

const montosIniciales = {
    subtotal: 0,
    iva: 0,
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
        setMontos({...montosIniciales, subtotal, iva: subtotal * 0.16, total: subtotal * 0.16 + subtotal }); 
    } , [servicios, iva]);

    const handleAdd = async ( formData: PresupuestoFormData ) => {
        if( servicios.length < 1 ){
            toast.warning('Debe agregar al menos un servicio');
            return;
        };
        const fullFormData = {
            formData: { ...formData, subtotal: montos.subtotal, iva: montos.iva, total: montos.total },
            servicios: servicios.map( servicio => {
                const { fechaEjecucion, descripcion, costo, tipoServicio, idConductor, nota, estado } = servicio;
                return {
                    id: '',
                    fechaEjecucion,
                    descripcion,
                    costo,
                    tipoServicio,
                    idConductor: servicio.idConductor,
                    nota,
                    estado
                };
            })
        };
        // AQUI SE LLAMA AL ACTION
        const res = await createPresupuesto(fullFormData);
        if( res.success ){
            toast.success(res.message as string);
        }
        else{
            toast.error(res.message as string);
        };

        setTimeout(() => location.href = location.pathname, 2000);
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
                    id='subtotal'
                    readOnly 
                    type="text" 
                    className="p-1 placeholder:text-inputColor rounded w-24"
                    value={formatCurrency(montos.subtotal)}
                    { ...register('subtotal')}
                />
            </div>
            <div className="px-5">
                <label htmlFor="iva">IVA 16%: </label>
                <input 
                    id='iva'
                    type="text" 
                    readOnly
                    className="p-1 placeholder:text-inputColor rounded w-24"
                    value={formatCurrency(montos.iva)}
                    { ...register('iva')}
                />
            </div>
            <div className="px-5">
                <label htmlFor="total">Total: </label>
                <input 
                    id='total'
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