"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { OutlineButton } from "../../ui/Buttons";
import { getConfig } from "@/actions/configuracion-actions";
import { Ruta } from "@/src/types";

type RutasFormProps = {
    tipo: "ordenesCompra" | "facturas";
}

export default function RutasForm({ tipo }: RutasFormProps){
    const [ datos, setDatos ] = useState<Ruta>({ruta: "", tipo});
    const [ editar, setEditar ] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Ruta>();

    useEffect(()=>{
        const fetchFolio = async () => {
            const config = await getConfig();
        }

        fetchFolio();
    },[]);

    const handleGuardar = async (formData: Ruta) => {
        console.log(formData);    
    };

    return (
        <>
        {
            editar ? 
                <form
                    onSubmit={handleSubmit(handleGuardar)}
                >
                    <label htmlFor="ruta">Ruta: </label>
                    <input
                        id="ruta" 
                        type="string" 
                        className={`mr-3 w-80 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.ruta && "border-2 border-destructiveColor"}`}
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