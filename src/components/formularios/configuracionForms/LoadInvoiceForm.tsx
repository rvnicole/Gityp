"use client"

import { ChangeEvent, ChangeEventHandler, MouseEvent, useRef, useState } from "react";
import { PrimaryButton } from "../../ui/Buttons";
import Spinner from "../../ui/Spinner";
import { flushSync } from "react-dom";

export default function LoadInvoiceForm(){
    const [ proceso, setProceso ] = useState('standby');
    const ref = useRef<HTMLInputElement | null>(null);


    const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        console.log('Hola')
        ref.current!.click();
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        flushSync(() => {
            setProceso('procesando');
        });
        console.log('Archivo cargado');
        console.log(e.target.value);
        console.log(e.target.dirName);
        console.log(e.target.files);
        const files = e.target.files;
        if( files ){
            const lector = new FileReader();
            const arrFiles = Array.from(files);

            arrFiles.forEach( file => {
                lector.onload = (event) => {
                    const contenido = event.target?.result as string;
                    console.log(contenido);
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(contenido, 'text/xml');

                    console.log(typeof xml);
                    console.log(xml);

                    if( xml ){
                        // Nodos
                        const comprobante = xml.getElementsByTagName('cfdi:Comprobante');
                        const timbreFiscal = xml.getElementsByTagName('tfd:TimbreFiscalDigital');
                        const emisor = xml.getElementsByTagName('cfdi:Emisor');
                        const receptor = xml.getElementsByTagName('cfdi:Receptor');

                        // Atributos de los nodos
                        const folio = comprobante[0]?.getAttribute('Folio');
                        const uuid = timbreFiscal[0]?.getAttribute('UUID');
                        const emisorRFC = emisor[0]?.getAttribute('Rfc');
                        const emisorNombre = emisor[0]?.getAttribute('Nombre');
                        const receptorRFC = receptor[0]?.getAttribute('Rfc');
                        const receptorNombre = receptor[0]?.getAttribute('Nombre');

                        console.log({
                            folio,
                            uuid,
                            emisorRFC,
                            emisorNombre,
                            receptorRFC,
                            receptorNombre
                        });
                    }
                }

                lector.readAsText(file);
            });
        };
        setTimeout(()=> setProceso('completado') ,2000);
    };

    return (
        <>
            <form>
                <input 
                    ref={ref}
                    type="file" 
                    accept=".xml"
                    multiple
                    className="hidden"
                    onChange={(e) => handleChangeInput(e)}
                />
                <button
                    onClick={(e) => handleClick(e)}
                    className="bg-primaryColor hover:bg-primaryColor-hover text-white border border-primaryColor hover:border-primaryColor-hover py-1 px-3 rounded"
                >
                    Seleccionar
                </button>
            </form>
            { proceso === 'procesando' && <><Spinner /><p className="text-center">Procesando...</p></> }
            { 
                proceso === 'completado' && 
                <p className="text-center text-lime-500 font-bold">Completado</p>}
        </>
    )
}