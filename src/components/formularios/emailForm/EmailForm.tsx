"use client";

import { PrimaryButton } from "../../ui/Buttons";
import { useForm } from "react-hook-form";
import { Email } from "@/src/types";
import Link from "next/link";
import { sendEmail } from "@/actions/email-actions";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import { toast } from "react-toastify";
import { getHTMLPresupuesto } from "@/src/lib/pdf";

export default function EmailForm(){
    const [ spinner, setSpinner ] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Email>();

    const handleEnviar = async ( formData: Email ) => {
        console.log(formData);
        setSpinner(true);
        
        const html = getHTMLPresupuesto();
        const htmlString = html!.outerHTML;

        const respuesta = await fetch("https://transform-to-string.onrender.com/transform", {
            method: "POST",
            body: JSON.stringify({ htmlString }),
            headers: {
                "content-type": "application/json; charset=utf-8"
            }
        });
        const resultado = await respuesta.json();
        if( !resultado.success ) {
            console.log(resultado.error);
            return;
        }     
        const data = resultado.data;

        const res = await sendEmail(formData, data);
        if( res.success ){
            toast.success(res.message as string);
            setTimeout(() => location.href = location.pathname, 2000);            
        }
        else{
            toast.error(res.message as string);
        };
    };

    return (
        <form 
            className='p-5 space-y-5 h-'
            onSubmit={handleSubmit(handleEnviar)}
        >
            {
                spinner ? 
                    <Spinner />
                :
                    <>
                        <div>
                            <label 
                                htmlFor="para"
                                className='font-semibold'
                            >
                                Para: 
                            </label>
                            <input 
                                id='para' 
                                type="email" 
                                multiple
                                className={`w-full p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${errors.para && "border-2 border-destructiveColor"}`}
                                {
                                    ...register('para',{
                                        required: true
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label 
                                htmlFor="copia"
                                className='font-semibold'
                            >
                                CC: 
                            </label>
                            <input 
                                id='copia' 
                                type="email" 
                                multiple
                                className={`w-full p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${false && "border-2 border-destructiveColor"}`}
                                { ...register('cc') }
                            />
                        </div>
                        <div>
                            <label 
                                htmlFor="copia-oculta"
                                className='font-semibold'
                            >
                                CCO: 
                            </label>
                            <input 
                                id='copia-oculta' 
                                type="email" 
                                multiple
                                className={`w-full p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${false && "border-2 border-destructiveColor"}`}
                                { ...register('cco') }
                            />
                        </div>
                        <div>
                            <label 
                                htmlFor="asunto"
                                className='font-semibold'
                            >
                                Asunto: 
                            </label>
                            <input 
                                id='asunto' 
                                type="text" 
                                className={`w-full p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${ errors.asunto && "border-2 border-destructiveColor"}`}
                                {
                                    ...register('asunto',{
                                        required: true
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label 
                                htmlFor="mensaje"
                                className='font-semibold'
                            >
                                Mensaje: 
                            </label>
                            <textarea 
                                id='mensaje' 
                                className={`w-full h-40 p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor ${ errors.mensaje && "border-2 border-destructiveColor"}`}
                                {
                                    ...register('mensaje',{
                                        required: true
                                    })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-5 justify-center">
                            <Link 
                                href={`${location.pathname}`}
                                className="w-full text-center bg-secondaryColor hover:bg-secondaryColor-hover text-secondaryColor-foreground border border-secondaryColor hover:border-secondaryColor-hover py-1 px-3 rounded cursor-pointer"
                            >
                                    Cancelar
                            </Link>
                            <PrimaryButton>Enviar</PrimaryButton>
                        </div>
                    </>                
            }
        </form>
    );
};