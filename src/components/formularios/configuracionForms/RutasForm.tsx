"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { OutlineButton, SecondaryButton } from "../../ui/Buttons";
import { getConfig, updateRutas } from "@/actions/configuracion-actions";
import { Ruta } from "@/src/types";
import { toast } from "react-toastify";

type RutasFormProps = {
    tipo: "ordenesCompra" | "facturas";
}

export default function RutasForm({ tipo }: RutasFormProps){
    const [ datos, setDatos ] = useState<Ruta>({ruta: "", tipo});
    const [ editar, setEditar ] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Ruta>();

    useEffect(()=>{
        const fetchConfig = async () => {
            const config = await getConfig();

            if(config.rutas) {
                const ruta = config.rutas[tipo] ? config.rutas[tipo] : "";
                setDatos({...datos, ruta});
            }
        }

        fetchConfig();
    }, []);

    const handleGuardar = async (formData: Ruta) => {
        const respuesta = await updateRutas(formData); 
        
        if( respuesta.success ) {
            toast.success(respuesta.message as string);
            setTimeout(() => location.href = location.pathname, 2000);
        }
        else {
            toast.error(respuesta.message as string);
        }
    };

    return (
        <>
        {
            editar ? 
                <form
                    className="space-x-3"
                    onSubmit={handleSubmit(handleGuardar)}
                >
                    <label htmlFor="ruta">Ruta: </label>
                    <input
                        id="ruta" 
                        type="string"
                        defaultValue={datos.ruta}
                        className={`mr-3 w-1/2 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.ruta && "border-2 border-destructiveColor"}`}
                        { ...register('ruta',{
                            required: true
                        })}
                    />

                    <input
                        id="tipo" 
                        type="hidden" 
                        defaultValue={tipo}
                        { ...register('tipo',{
                            required: true
                        })}
                    />
                    <OutlineButton>Guardar</OutlineButton>
                    <SecondaryButton onClick={() => setEditar(false)}>Cancelar</SecondaryButton>
                </form>
            :
                <div className="flex items-center">
                    <p className="text-foregroundColor mr-3">Ruta: {datos.ruta}</p>
                    <OutlineButton onClick={() => setEditar(true)}>Editar</OutlineButton>
                </div>
        }
        </>
    )
};