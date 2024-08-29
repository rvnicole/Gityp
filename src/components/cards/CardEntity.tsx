import { EmisoresReceptores } from "@/src/types";
import { useState } from "react";
import { DestructiveButton, OutlineButton } from "../ui/Buttons";
import { useForm } from "react-hook-form";
import { deleteEmisorReceptor, updateEmisorReceptor } from "@/actions/emisor-receptor-actions";
import { useRouter } from "next/navigation";

type CardEntityProps = {
    emisor?: EmisoresReceptores,
    receptor?: EmisoresReceptores
}

export default function CardEntity({ emisor, receptor }: CardEntityProps){
    const [ editar, setEditar ] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EmisoresReceptores>({ defaultValues: emisor ? emisor : receptor });
    const router = useRouter();

    const handleGuardar = async (formData: EmisoresReceptores) => {
        const respuesta = await updateEmisorReceptor(formData);
        setEditar(false);

        if( respuesta.success ) {
            alert(respuesta.message);
        }
        else {
            alert(respuesta.message);
        }

        router.refresh();
        router.push(location.pathname);
    }

    const handleDelete = async (id: EmisoresReceptores['id']) => {
        const respuesta = await deleteEmisorReceptor({ id });

        if( respuesta.success ) {
            alert(respuesta.message);
        }
        else {
            alert(respuesta.message);
        }

        router.refresh();
        router.push(location.pathname);
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
                <div className="grid grid-cols-3 gap-2 bg-accentColor p-3 rounded-lg items-center">
                    <p>{`${emisor.nombre}`}</p>
                    <p>{`${emisor.rfc}`}</p>

                    <div className="flex justify-center gap-3">
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

                    <div className="flex justify-center gap-3">
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