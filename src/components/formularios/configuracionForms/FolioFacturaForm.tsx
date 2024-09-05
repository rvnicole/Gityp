"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { OutlineButton } from "../../ui/Buttons";
import { getConfig, setFolioInicial } from "@/actions/configuracion-actions";

export default function FolioFacturaForm(){
    const [ folio, setFolio ] = useState('');
    const [ editar, setEditar ] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<{ folio: string }>();
    useEffect(()=>{
        const fetchFolio = async () => {
            const config = await getConfig();
            setFolio(config.folioInicial);
        }
        fetchFolio();
    },[]);

    const handleGuardar = async (formData: { folio: string }) => {
        console.log(formData);
        const res = await setFolioInicial(formData);
        if( res.success ){
            setFolio( formData.folio );
            setEditar(false);
        }
        alert(res.message);       
    };

    return (
        <>
        {
            editar ? 
                <form
                    onSubmit={handleSubmit(handleGuardar)}
                >
                    <label htmlFor="folio">Folio: </label>
                    <input
                        id="folio" 
                        type="number" 
                        className={`mr-3 w-16 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.folio && "border-2 border-destructiveColor"}`}
                        { ...register('folio',{
                            required: true
                        })}
                    />
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