import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PresupuestoFormData, ServiceFormData } from "@/src/types";
import { PrimaryButton, SecondaryButton } from "../../ui/Buttons";
import { formatCurrency, formatDate } from "@/src/lib";
import PresupuestoForm from "./PresupuestoForm";
import Link from "next/link";


// OBJETO DE EJEMPLO
const objEjemploPresupuesto = {
    id: '0904',
    fecha: new Date(),
    proveedor: '1230',
    solicito: 'Fernando Rocha',
    subtotal: 5000,
    iva: 16,
    total: 5800,
    servicios: [
        {
            id: '0123',
            idOrdenServicio: '',
            fechaEjecucion: new Date(),
            descripcion: 'Servicio de transporte paquetería para entrega de muestras de helado',
            costo: 3500,
            tipoServicio: 'paqueteria',
            idConductor: 'conductor',
            nota: 'El servicio requiere hielo seco',
            estado: 'assign',
            controlForm:''
        },
        {
            id: '0124',
            idOrdenServicio: '',
            fechaEjecucion: new Date(),
            descripcion: 'Servicio de transporte paquetería, entrega de refrigerador',
            costo: 2000,
            tipoServicio: 'paqueteria',
            idConductor: 'conductor',
            nota: 'El congelador no viene emplayado',
            estado: 'assign',
            controlForm: ''
        }
    ]
}

const montosIniciales = {
    subtotal: 0,
    iva: 16,
    total: 0
}

export default function EditPresupuesto(){
    const router = useRouter();
    const ser = objEjemploPresupuesto.servicios;
    const [ servicios, setServicios ] = useState<ServiceFormData[]>(ser);
    const [ openServiceForm, setOpenServiceForm ] = useState(false);
    const [ montos, setMontos ] = useState({ subtotal: objEjemploPresupuesto.subtotal, iva: objEjemploPresupuesto.iva, total: objEjemploPresupuesto.total }); 
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<PresupuestoFormData>({ defaultValues: objEjemploPresupuesto });
    const iva = watch('iva') ? watch('iva') : montos.iva;
    const fecha = formatDate(objEjemploPresupuesto.fecha);
    useMemo(()=>{ 
        const subtotal = servicios.reduce((acumulado, servicio) => acumulado + +servicio.costo, 0);
        setMontos({...montosIniciales, subtotal, iva, total: subtotal * iva/100 + subtotal }); 
    } , [servicios, iva]);

    const handleEdit = ( formData: PresupuestoFormData ) => {
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