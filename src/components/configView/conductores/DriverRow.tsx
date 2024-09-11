import { Conductores } from "@/src/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DestructiveButton, OutlineButton } from "../../ui/Buttons";
import { deleteConductor, updateConductor } from "@/actions/conductor-actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type DriverRowProps = {
    conductor: Conductores
}

export default function DriverRow( {conductor}: DriverRowProps  ){
    const [ editar, setEditar ] = useState(false);
    const { register, handleSubmit, reset, formState: {errors} } = useForm({ defaultValues: conductor });
    const router = useRouter();

    const handleGuardar = async (formData: Conductores) => {
        const res = await updateConductor(formData);
        if( res.success ){
            toast.success(res.message as string);
        }
        else{
            toast.error(res.message as string);
        }
        setEditar(false);
        setTimeout(()=>{
            location.href = location.pathname;
        },2000);    
    };

    const handleDelete = async ( id: Conductores['id'] ) => {
        const res = await deleteConductor(id);
        if( res.success ){
            toast.success(res.message as string);
        }
        else{
            toast.error(res.message as string);
        }
        setEditar(false);
        setTimeout(()=>{
            location.href = location.pathname;
        },2000);    
    };

    return (
        <>
            {
                editar ? 
                    <form
                        key={conductor.id} 
                        className="grid grid-cols-5 bg-accentColor p-3 rounded-lg gap-3"
                    >
                        <input 
                            id='id'
                            type="hidden"
                            { ...register('id') }
                        />
                        <input
                            id='nombre'
                            type="text"
                            placeholder="Nombre"
                            className="rounded w-32 p-1"
                            { ...register('nombre',{
                                required: true
                            }) }
                        />
                        <input 
                            id="apellido" 
                            type="text" 
                            placeholder="Apellido"
                            className="rounded w-32 p-1"
                            { ...register('apellido')}
                        />
                        <input 
                            id="edad"
                            type="number" 
                            placeholder="Edad"
                            className="rounded w-32 p-1"
                            { ...register('edad')}
                        />
                        <input 
                            id="licencia"
                            type="text"
                            placeholder="Licencia"
                            className="rounded w-40 p-1" 
                            { ...register('licencia')}
                        />
                        <div className='flex justify-center gap-3'>
                            <OutlineButton onClick={handleSubmit(handleGuardar)}>
                                Guardar
                            </OutlineButton>
                            <DestructiveButton onClick={() => handleDelete(conductor.id)}>
                                Eliminar
                            </DestructiveButton>
                        </div>
                    </form>
                :
                    <div
                        key={conductor.id} 
                        className="grid grid-cols-5 gap-3 bg-accentColor p-3 rounded-lg items-center"
                    >
                        <p>{`${conductor.nombre}`}</p>
                        <p>{`${conductor.apellido}`}</p>
                        <p>{conductor.edad}</p>
                        <p>{conductor.licencia}</p>
                        <div className="flex justify-center gap-3">
                            <OutlineButton onClick={() => setEditar(true)}>
                                Editar
                            </OutlineButton>
                            <DestructiveButton onClick={() => handleDelete(conductor.id)}>
                                Eliminar
                            </DestructiveButton>
                        </div>
                    </div>
            }
        </>
    )
}