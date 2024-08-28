"use client";
import { OutlineButton } from "../../ui/Buttons";
import { Conductores } from "@/src/types";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ConductoresViewProps = {
    conductores: Conductores[]
}

function DriverRow( conductor: Conductores ){
    const [ editar, setEditar ] = useState(false);
    const { register, handleSubmit, reset, formState: {errors} } = useForm({ defaultValues: conductor });

    const handleGuardar = (formData: Conductores) => {
        console.log(formData);
        setEditar(!editar);
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
                        <OutlineButton onClick={handleSubmit(handleGuardar)}>
                            Guardar
                        </OutlineButton>
                    </form>
                :
                    <div
                        key={conductor.id} 
                        className="grid grid-cols-5 bg-accentColor p-3 rounded-lg items-center"
                    >
                        <p>{`${conductor.nombre}`}</p>
                        <p>{`${conductor.apellido}`}</p>
                        <p>{conductor.edad}</p>
                        <p>{conductor.licencia}</p>
                        <OutlineButton onClick={() => setEditar(!editar)}>
                            Editar
                        </OutlineButton>
                    </div>
            }
        </>
    )
}

export default function ConductoresView({ conductores }: ConductoresViewProps){
    
    return(
        <>
            { 
                conductores.map( (conductor, index) => 
                    <div key={conductor.id}>
                        { DriverRow(conductor) }   
                    </div>
                )
            }
        </>
    )
}