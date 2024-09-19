import { EmisoresReceptores } from "@/src/types";
import { useState } from "react";
import { DestructiveButton, OutlineButton } from "../ui/Buttons";
import { useForm } from "react-hook-form";
import { deleteEmisorReceptor, updateEmisorReceptor } from "@/actions/emisor-receptor-actions";
import { toast } from "react-toastify";

type CardEntityProps = {
    emisor?: EmisoresReceptores,
    receptor?: EmisoresReceptores
}

export default function CardEntity({ emisor, receptor }: CardEntityProps){
    const [ editar, setEditar ] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EmisoresReceptores>({ defaultValues: emisor ? emisor : receptor });

    const handleGuardar = async (formData: EmisoresReceptores) => {
        const respuesta = await updateEmisorReceptor(formData);
        setEditar(false);

        if( respuesta.success ) {
            toast.success(respuesta.message as string);
        }
        else {
            toast.error(respuesta.message as string);
        }

        setTimeout(()=>{
            location.href = location.pathname;
        }, 2000);
    }

    const handleDelete = async (id: EmisoresReceptores['id']) => {
        const respuesta = await deleteEmisorReceptor({ id });

        if( respuesta.success ) {
            toast.success(respuesta.message as string);
        }
        else {
            toast.error(respuesta.message as string);
        };

        setTimeout(()=>{
            location.href = location.pathname;
        }, 2000);
        
    }

    if(emisor) return(
        <>
            {
            editar ? 
                <form
                    className="grid md:grid-cols-3 bg-accentColor p-3 rounded-lg items-center gap-3"
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
                <div className="grid md:grid-cols-3 gap-2 bg-accentColor p-3 rounded-lg items-center">
                    <p>{`${emisor.nombre}`}</p>
                    <p>{`${emisor.rfc}`}</p>

                    <div className="grid grid-cols-2 justify-center gap-3">
                        <OutlineButton onClick={() => setEditar(true)}>
                            Editar
                        </OutlineButton>

                        <DestructiveButton onClick={() => handleDelete(emisor.id)}>
                            Eliminar
                        </DestructiveButton>
                    </div>
                </div>
            }
        </>
    );

    if(receptor) return(
        <>
            {
            editar ? 
                <form
                    className="grid md:grid-cols-3 bg-accentColor p-3 rounded-lg items-center gap-3"
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
                <div className="grid md:grid-cols-3 bg-accentColor p-3 rounded-lg items-center gap-2">
                    <p>{`${receptor.nombre}`}</p>
                    <p>{`${receptor.rfc}`}</p>

                    <div className="grid grid-cols-2 justify-center gap-3">
                        <OutlineButton onClick={() => setEditar(true)}>
                            Editar
                        </OutlineButton>

                        <DestructiveButton onClick={() => handleDelete(receptor.id)}>
                            Eliminar
                        </DestructiveButton>
                    </div>
                </div>
            }
        </>
    )
};