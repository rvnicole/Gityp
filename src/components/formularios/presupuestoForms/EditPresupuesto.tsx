import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Presupuesto, PresupuestoFormData, ServiceFormData } from "@/src/types";
import { PrimaryButton } from "../../ui/Buttons";
import { evalDate, formatCurrency, formatDate } from "@/src/lib";
import PresupuestoForm from "./PresupuestoForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updatePresupuesto } from "@/actions/presupuesto-actions";
import { toast } from 'react-toastify';

const montosIniciales = {
    subtotal: 0,
    iva: 16,
    total: 0
}

export default function EditPresupuesto({ defaultValues }: { defaultValues: Presupuesto }){
    const router = useRouter();
    const ser = defaultValues.servicios;
    const [ servicios, setServicios ] = useState<ServiceFormData[]>(ser);
    const [ openServiceForm, setOpenServiceForm ] = useState(false);
    const [ montos, setMontos ] = useState({ subtotal: defaultValues.subtotal, iva: defaultValues.iva, total: defaultValues.total }); 
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<PresupuestoFormData>({ defaultValues });
    const iva = watch('iva') ? watch('iva') : montos.iva;
    const fecha = formatDate(new Date(evalDate(defaultValues.fecha)));
    useMemo(()=>{ 
        const subtotal = servicios.reduce((acumulado, servicio) => acumulado + +servicio.costo, 0);
        setMontos({...montosIniciales, subtotal, iva: subtotal * 0.16, total: subtotal * 0.16 + subtotal }); 
    } , [servicios, iva]);

    const handleEdit = async ( formData: PresupuestoFormData ) => {
        if( servicios.length < 1 ){
            toast.warning('Debe agregar al menos un servicio');
            return;
        };
        const fullFormData = {
            formData: { ...formData, subtotal: montos.subtotal, iva: montos.iva, total: montos.total },
            servicios: servicios.map( servicio => {
                const { fechaEjecucion, descripcion, costo, tipoServicio, idConductor, nota, estado, id } = servicio;
                return {
                    id,
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
        console.log(fullFormData);
        // AQUI SE LLAMA AL ACTION
        const res = await updatePresupuesto(fullFormData);
        if( res.success ){
            toast.success(res.message as string);
        }
        else{
            toast.error(res.message as string);
        };
        router.refresh();
        router.push(location.pathname);
    };

    return (
        <form 
            onSubmit={handleSubmit(handleEdit)}
            className="mt-10 space-y-5"
        >
            <PresupuestoForm 
                fecha={fecha}
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
                <PrimaryButton>Guardar</PrimaryButton>
            </div>
        </form>
    )
}