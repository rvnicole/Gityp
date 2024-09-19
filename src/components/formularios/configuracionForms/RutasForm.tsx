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
                    className="space-x-3 flex gap-3 flex-col md:flex-row"
                    onSubmit={handleSubmit(handleGuardar)}
                >
                    <div className="flex items-center gap-3 md:w-1/2 ml-5 md:ml-0">
                        <label htmlFor="ruta">Ruta: </label>
                        <input
                            id="ruta" 
                            type="string"
                            defaultValue={datos.ruta}
                            className={`mr-3 w-full p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.ruta && "border-2 border-destructiveColor"}`}
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
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <OutlineButton>Guardar</OutlineButton>
                        <SecondaryButton onClick={() => setEditar(false)}>Cancelar</SecondaryButton>
                    </div>
                </form>
            :
                <div className="flex items-center gap-3">
                    <p className="text-foregroundColor mr-3">Ruta: {(datos.ruta).substring(0, 15)}...</p>
                    <OutlineButton onClick={() => setEditar(true)}>Editar</OutlineButton>
                </div>
        }
        </>
    )
};