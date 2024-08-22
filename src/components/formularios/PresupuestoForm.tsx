import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PresupuestoFormData, ServiceFormData } from "@/src/types";
import { OutlineButton, PrimaryButton, SecondaryButton } from "../ui/Buttons";
import ServicioFormDetails from "./ServicioFormDetails";
import ServicesData from "./ServiceData";
import { formatCurrency } from "@/src/lib";

const nameForm = 'presupuesto';
const montosIniciales = {
    subtotal: 0,
    iva: 16,
    total: 0
}

export default function PresupuestoForm(){
    const router = useRouter();
    const [ servicios, setServicios ] = useState<ServiceFormData[]>([]);
    const [ openServiceForm, setOpenServiceForm ] = useState(true);
    const [ montos, setMontos ] = useState(montosIniciales);
    useMemo(()=>{ 
        const subtotal = servicios.reduce((acumulado, servicio) => acumulado + +servicio.costo, 0);
        setMontos({...montosIniciales, subtotal, total: subtotal * montos.iva/100 + subtotal }); 
    } , [servicios]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<PresupuestoFormData>();

    const handleAdd = ( formData: PresupuestoFormData ) => {
        console.log(formData);
        if( servicios.length < 1 ){
            alert('Debe agregar al menos un servicio');
        };
    }

    return (
        <form 
            onSubmit={handleSubmit(handleAdd)}
            className="mt-10 space-y-5"
        >
            <div className="flex justify-between px-5">
                <div>
                    <label htmlFor="fecha">Fecha: </label>
                    <input 
                        id="fecha" 
                        type="date" 
                        className={`p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.fecha && "border-2 border-destructiveColor"}`}
                        { ...register('fecha', {
                            required: true
                        })}
                    />
                    <span className="inline text-destructiveColor p-2">*</span>
                </div>
                <div>
                    <label htmlFor="proveedor">Proveedor: </label>
                    <input 
                        id="proveedor" 
                        type="text" 
                        className={`p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.proveedor && "border-2 border-destructiveColor"}`}
                        { ...register('proveedor') }
                    />
                </div>
                <div>
                    <label htmlFor="solicito">Solicitó: </label>
                    <input 
                        id="solicito" 
                        type="text" 
                        className={`p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.solicito && "border-2 border-destructiveColor"}`}
                        { ...register('solicito', {
                            required: true
                        })}
                    />
                    <span className="inline text-destructiveColor p-2">*</span>
                </div>
            </div>
            {
                servicios.length > 0 &&
                <fieldset className="px-5">
                    <legend className="font-bold mb-3 text-lg">Lista de servicios: </legend>
                    <div className="grid grid-cols-5 border border-b border-mutedColor gap-y-1">
                        <label className="font-bold">Fecha de ejecución</label>                        
                        { /*<label className="font-bold text-center">Conductor</label>*/ }
                        <label className="font-bold text-center">Tipo</label> 
                        <label className="font-bold ">Descripcion</label>  
                        <label className="font-bold text-center">Costo</label>
                        <label className="font-bold">Nota</label>
                        {
                            servicios.map( servicio => <ServicesData servicio={servicio}/> )
                        }
                    </div>
                </fieldset>
            }
            {
                openServiceForm ? 
                    <ServicioFormDetails 
                        servicios={servicios}
                        setServicios={setServicios}
                        fatherForm={nameForm}
                        setOpenServiceForm={setOpenServiceForm}
                        register={register}
                        errors={errors}
                    />
                :
                    <div className="px-5">
                        <OutlineButton onClick={()=>setOpenServiceForm(true)}>Agregar servicio</OutlineButton>
                    </div>
            }
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
                    value={montos.iva}
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