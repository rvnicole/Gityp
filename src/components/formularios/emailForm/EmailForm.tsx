"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton, SecondaryButton } from "../../ui/Buttons";
import { useForm } from "react-hook-form";
import { Email } from "@/src/types";
import Link from "next/link";
import { sendEmail } from "@/actions/email-actions";
import { numberToWords } from "@/src/lib";
import Spinner from "../../ui/Spinner";
import { useState } from "react";

export default function EmailForm(){
    const [ spinner, setSpinner ] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Email>();

    const handleEnviar = async ( formData: Email ) => {
        setSpinner(true);
        
        const html = document.createElement('html');
        const head = document.createElement('head');
        const script = document.createElement('script');
        const body = document.createElement('body');
        const contenedorImg = document.createElement('div');
        const img = document.createElement('img');
        const parrafo = document.createElement('p');
        const parrafoTotal = document.createElement('p');
        const dataProveedor = `<p class="font-semibold">RFC: 
                    <span class="font-normal">REGE6003152Q7</span>
                </p>
                <p class="font-semibold">Nombre: 
                    <span class="font-normal">Eduardo Reynoso González</span>
                </p>
                <p class="font-semibold">Tel: 
                    <span class="font-normal">56 2791 1151</span>
                </p>
                <p class="font-semibold">Email: 
                    <span class="font-normal">eduardo47@hotmail.com</span>
                </p>
                `

        const presupuestoHtmlStr = document.querySelector('#imp-presupuesto-detalles')!;
        const estadoHtml = document.querySelector('#imp-estado')!;
        const columnasHtml = document.querySelector('#imp-title-colums')!;
        const divDataTable = document.querySelectorAll('#imp-data-table')!;
        const contenedorTableHtml = document.querySelectorAll('.imp-columns')!;
        const divDataProveedor = document.querySelector('#imp-data-proveedor')!;
        const parrafoTotalHtml = document.querySelector('.imp-data-total')!;
        const divTotales = document.querySelector('#imp-monto-letra')!;

        
        estadoHtml.remove();
        console.log(contenedorTableHtml.length);
        for( let i = contenedorTableHtml.length; i > 0; i-- ){
            console.log(contenedorTableHtml[i - 1]);
            contenedorTableHtml[i-1].remove();
        };

        for( let i = 0; i < divDataTable.length; i++ ){
            console.log({ etiqueta: divDataTable[i] });
            divDataTable[i].classList.add('grid-cols-8');
        };

        const total = Number(parrafoTotalHtml.getAttribute('data-set')!);
        const centavos = total.toFixed(2).toString().split('.')[1];
        divDataProveedor.innerHTML = divDataProveedor.innerHTML + dataProveedor;
        columnasHtml.classList.add('bg-sky-500', 'text-white', 'grid-cols-8');  
        script.setAttribute('src', "https://cdn.tailwindcss.com");
        parrafo.textContent = 'Se requiere Orden de compra antes del servicio';
        parrafo.classList.add('font-semibold', 'text-slate-600', 'text-center');
        parrafoTotal.classList.add('p-5', 'text-center', 'font-semibold', 'uppercase', 'col-span-6');
        parrafoTotal.textContent = numberToWords(Math.floor(total)) + ` ${centavos}/100 M.N.`;
        parrafoTotalHtml.classList.add('text-lg');
        divTotales.className = "grid grid-cols-8";
        body.classList.add('px-5');
        contenedorImg.classList.add('w-full','flex','justify-center', 'mb-3');
        //img.className = 'w-64';
        img.src = location.origin+"/logo.png";

        divTotales.insertBefore(parrafoTotal,divTotales.firstChild);
        head.appendChild(script);
        contenedorImg.appendChild(img);
        body.appendChild(contenedorImg);
        body.appendChild(presupuestoHtmlStr);
        body.appendChild(parrafo);
        html.appendChild(head);
        html.appendChild(body);

        console.log(location);

        console.log(html);

        const htmlString = html.outerHTML

        const res = await sendEmail(formData, htmlString);
        console.log(formData);
        alert(res.message);
        if( res.success ){
            window.location.href = location.pathname;
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