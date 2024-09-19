"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { OutlineButton, SecondaryButton } from "../../ui/Buttons";
import { getConfig, setFolioInicial } from "@/actions/configuracion-actions";
import { toast } from "react-toastify";

export default function FolioFacturaForm(){
    const [ folio, setFolio ] = useState('');
    const [ editar, setEditar ] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<{ folio: string }>();
    useEffect(()=>{
        /*
        const fetchFolio = async () => {
            const config = await getConfig();
            setFolio(config.folioInicial);
        }
        fetchFolio();*/
    },[]);

    const handleGuardar = async (formData: { folio: string }) => {
        /*
        console.log(formData);
        const res = await setFolioInicial(formData);
        if( res.success ){
            setFolio( formData.folio );
            setEditar(false);
            toast.success(res.message as string);
        }
        else{
            toast.error(res.message as string);
        }*/
    };

    return (
        <>
        {
            editar ? 
                <form
                    onSubmit={handleSubmit(handleGuardar)}
                    className="flex flex-col sm:items-center space-y-3 sm:flex-row sm:space-x-2"
                >
                    <label htmlFor="folio">Folio: </label>
                    <input
                        id="folio" 
                        type="number" 
                        className={`mr-3 w-full sm:w-20 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.folio && "border-2 border-destructiveColor"}`}
                        { ...register('folio',{
                            required: true
                        })}
                    />
                    <SecondaryButton onClick={() => setEditar(false)}>Cancelar</SecondaryButton>
                    <OutlineButton>Guardar</OutlineButton>
                </form>
            :
                <div className="flex items-center">
                    <p className="text-foregroundColor mr-3">Folio: {folio}</p>
                    <OutlineButton onClick={() => setEditar(true)}>Editar</OutlineButton>
                </div>
        }
        </>
    )
};