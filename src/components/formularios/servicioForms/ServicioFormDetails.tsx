import { useForm} from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ServiceFormData } from "@/src/types";
import { initialValuesService } from "../presupuestoForms/PresupuestoForm";
import ServicioForm from "./ServicioForm";

type ServicioFormProps = {
    servicios?: ServiceFormData[],
    setServicios?: Dispatch<SetStateAction<ServiceFormData[]>>,
    fatherForm?: string,
    setOpenServiceForm?: Dispatch<SetStateAction<boolean>>, 
    servicioEdit?: ServiceFormData,
    setServicioEdit?: Dispatch<SetStateAction<ServiceFormData>>
}

export default function ServicioFormDetails({ servicios, setServicios, fatherForm, setOpenServiceForm, servicioEdit, setServicioEdit }: ServicioFormProps){
    const { register, handleSubmit, reset, formState: { errors } } =  useForm<ServiceFormData>( servicioEdit && { defaultValues: servicioEdit } );
    useEffect(()=>{
        if(servicioEdit){
            reset(servicioEdit);
        }
    },[servicioEdit]);

    const addService = ( formData: ServiceFormData ) => {
        if( setOpenServiceForm && setServicios && servicios){
            const data = {
                ...formData,
                id: crypto.randomUUID() // ID para renderizar como key
            };
            setServicios([...servicios, data]);
            setOpenServiceForm(false);
        }
        return;
    };

    const editService = ( formData: ServiceFormData ) => {
        if( setOpenServiceForm && servicioEdit && setServicios && servicios  ){            
            const updateServices = servicios.map( servicio =>{
                if( servicio.id === servicioEdit.id ){
                    return {
                        ...servicio,
                        ...formData
                    };
                };
                return servicio;
            });
            setServicios([...updateServices]);
            setOpenServiceForm(false);
            setServicioEdit!(initialValuesService);
        }
    };

    const handleServiceFormData = ( formData: ServiceFormData ) => {
        if( servicioEdit && servicioEdit.id ){
            editService(formData);
        }
        else{
            addService(formData);
        };        
    };
    
    // Cierre desde el formulario de presupuesto
    const handleCloseForm = () =>{
        if(setOpenServiceForm && setServicioEdit){
            setOpenServiceForm(false);
            setServicioEdit(initialValuesService);
        } 

    };

    return (

        <ServicioForm 
            register={register}
            errors={errors}
            handleCloseForm={handleCloseForm}
            handleServiceFormData={handleServiceFormData}
            handleSubmit={handleSubmit}
        />
        
    )
}