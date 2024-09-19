import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PresupuestoFormData, ServiceFormData } from "@/src/types";
import { OutlineButton } from "../../ui/Buttons";
import ServicioFormDetails from "./ServicioFormDetails";
import ServicesData from "./ServiceData";

const nameForm = 'presupuesto';
export const initialValuesService = {
    id: '',
    fechaEjecucion: new Date(),
    descripcion: '',
    costo: 0,
    tipoServicio: '',
    idConductor: {
        id: '',
        nombre: '',
        apellido: '',
        edad: 0,
        licencia: ''
    },
    nota: '',
    estado: 'assign',
    controlForm: ''
}

type PresupuestoFormProps = {
    fecha?: string,
    register: UseFormRegister<PresupuestoFormData>, 
    errors: FieldErrors<PresupuestoFormData>, 
    servicios: ServiceFormData[], 
    setServicios: Dispatch<SetStateAction<ServiceFormData[]>>, 
    openServiceForm: boolean, 
    setOpenServiceForm: Dispatch<SetStateAction<boolean>>
};

export default function PresupuestoForm({ fecha, register, errors, servicios, setServicios, openServiceForm, setOpenServiceForm }: PresupuestoFormProps){
    const [ servicioEdit, setServicioEdit ] = useState<ServiceFormData>(initialValuesService);
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const modo = params.get('modal');

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-5 justify-between px-5">
                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex items-center">
                        <label htmlFor="fecha">Fecha: </label>
                        <span className="text-destructiveColor p-2">*</span>
                    </div>                    
                    {
                        modo === 'edit' ? 
                            <input 
                                id="fecha" 
                                type="text"                                 
                                readOnly
                                value={fecha}
                            />
                        :
                        <div>
                            <input 
                                id="fecha" 
                                type="date" 
                                className={`w-full md:w-auto p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.fecha && "border-2 border-destructiveColor"}`}
                                { ...register('fecha', {
                                    required: true
                                })}
                            />                            
                        </div>                            
                    }                    
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <label htmlFor="proveedor">Proveedor: </label>
                    <input 
                        id="proveedor" 
                        type="text" 
                        className={`w-full md:w-auto p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.proveedor && "border-2 border-destructiveColor"}`}
                        { ...register('proveedor') }
                    />
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex items-center">
                        <label htmlFor="solicito">Solicitó: </label>
                        <span className="inline text-destructiveColor p-2">*</span>
                    </div>
                    <input 
                        id="solicito" 
                        type="text" 
                        className={`w-full md:w-auto p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.solicito && "border-2 border-destructiveColor"}`}
                        { ...register('solicito', {
                            required: true
                        })}
                    />                    
                </div>
            </div>
            {
                servicios.length > 0 &&
                <fieldset className="px-5">
                    <legend className="font-bold mb-3 text-lg">Lista de servicios: </legend>
                    <div className="grid grid-cols-1 md:grid-cols-6 border border-b border-mutedColor gap-y-1">
                            <label className="hidden md:block font-bold">Fecha de ejecución</label>                        
                            { /*<label className="font-bold text-center">Conductor</label>*/ }
                            <label className="hidden md:block font-bold text-center">Tipo</label> 
                            <label className="hidden md:block font-bold ">Descripcion</label>  
                            <label className="hidden md:block font-bold text-center">Costo</label>
                            <label className="hidden md:block font-bold">Nota</label>
                            <label className="hidden md:block font-bold text-center">Acciones</label>
                        {
                            servicios.map( servicio => 
                                    <>
                                        <ServicesData 
                                            key={servicio.id} 
                                            servicio={servicio}
                                            setServicioEdit={setServicioEdit}
                                            servicios={servicios}
                                            setServicios={setServicios}
                                        /> 
                                    </>
                            )
                        }
                    </div>
                </fieldset>
            }
            {
                openServiceForm || servicioEdit.id ? 
                    <ServicioFormDetails 
                        servicios={servicios}
                        setServicios={setServicios}
                        fatherForm={nameForm}
                        setOpenServiceForm={setOpenServiceForm}
                        servicioEdit={servicioEdit}
                        setServicioEdit={setServicioEdit}
                    />
                :
                    <div className="px-5">
                        <OutlineButton onClick={()=>setOpenServiceForm(true)}>Agregar servicio</OutlineButton>
                    </div>
            }
        </>
    )
}