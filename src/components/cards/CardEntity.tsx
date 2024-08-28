import { EmisoresReceptores } from "@/src/types";
import { useState } from "react";
import { OutlineButton } from "../ui/Buttons";
import { useForm } from "react-hook-form";

type CardEntityProps = {
    emisor?: EmisoresReceptores,
    receptor?: EmisoresReceptores
}

export default function CardEntity({ emisor, receptor }: CardEntityProps){
    const [ editar, setEditar ] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EmisoresReceptores>({ defaultValues: emisor ? emisor : receptor });

    const handleGuardar = (formData: EmisoresReceptores) => {
        console.log(formData);
        setEditar(false);
    }

    if(emisor) return(
        <>
            {
            editar ? 
                <form
                    className="grid grid-cols-3 bg-accentColor p-3 rounded-lg items-center gap-3"
                    onSubmit={handleSubmit(handleGuardar)}
                >
                    <input
                        id='nombre'
                        type="text"
                        placeholder="Razón social"
                        className="rounded w-72 p-1"
                        { ...register('nombre',{
                            required: true
                        }) }
                    />
                    <input
                        id='rfc'
                        type="text"
                        placeholder="RFC"
                        className="rounded w-64 p-1"
                        { ...register('rfc',{
                            required: true
                        }) }
                    />
                    <OutlineButton>Guardar</OutlineButton>
                </form>
            :
                <div className="grid grid-cols-3 bg-accentColor p-3 rounded-lg items-center">
                    <p>{`${emisor.nombre}`}</p>
                    <p>{`${emisor.rfc}`}</p>
                    <OutlineButton onClick={() => setEditar(true)}>
                        Editar
                    </OutlineButton>
                </div>
            }
        </>
    );

    if(receptor) return(
        <>
            {
            editar ? 
                <form
                    className="grid grid-cols-3 bg-accentColor p-3 rounded-lg items-center gap-3"
                    onSubmit={handleSubmit(handleGuardar)}
                >
                    <input
                        id='nombre'
                        type="text"
                        placeholder="Razón social"
                        className="rounded w-72 p-1"
                        { ...register('nombre',{
                            required: true
                        }) }
                    />
                    <input
                        id='rfc'
                        type="text"
                        placeholder="RFC"
                        className="rounded w-64 p-1"
                        { ...register('rfc',{
                            required: true
                        }) }
                    />
                    <OutlineButton>Guardar</OutlineButton>
                </form>
            :
                <div className="grid grid-cols-3 bg-accentColor p-3 rounded-lg items-center">
                    <p>{`${receptor.nombre}`}</p>
                    <p>{`${receptor.rfc}`}</p>
                    <OutlineButton onClick={() => setEditar(true)}>
                        Editar
                    </OutlineButton>
                </div>
            }
        </>
    )
};