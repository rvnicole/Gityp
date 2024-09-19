"use client"

import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import Spinner from "../../ui/Spinner";
import { flushSync } from "react-dom";
import { createEmisorReceptor } from "@/actions/emisor-receptor-actions";
import { myDateMX } from "@/src/lib";
import { createInvoice } from "@/actions/factura-actions";

export default function LoadInvoiceForm(){
    const [ errores, setErrores ] = useState<{ folio: string, message:string }[]>([]);
    const [ proceso, setProceso ] = useState('standby');
    const ref = useRef<HTMLInputElement | null>(null);


    const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        ref.current!.click();
    }

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {

        // Forza la actualizacion del renderizado
        flushSync(() => setProceso('procesando'));

        const files = e.target.files;
        if( files ){
            const arrFiles = Array.from(files);

            arrFiles.forEach( file => {
                
                    const lector = new FileReader();
                    lector.onload = async (event) => {
                        const contenido = event.target?.result as string;
                        const parser = new DOMParser();
                        const xml = parser.parseFromString(contenido, 'text/xml');

                        if( xml ){
                            // Nodos
                            const comprobante = xml.getElementsByTagName('cfdi:Comprobante');
                            const timbreFiscal = xml.getElementsByTagName('tfd:TimbreFiscalDigital');
                            const emisor = xml.getElementsByTagName('cfdi:Emisor');
                            const receptor = xml.getElementsByTagName('cfdi:Receptor');

                            // Atributos de los nodos
                            const folio = comprobante[0]?.getAttribute('Folio')!;
                            const total = comprobante[0]?.getAttribute('Total');
                            const uuid = timbreFiscal[0]?.getAttribute('UUID')!;
                            const emisorRFC = emisor[0]?.getAttribute('Rfc')!;
                            const emisorNombre = emisor[0]?.getAttribute('Nombre')!;
                            const receptorRFC = receptor[0]?.getAttribute('Rfc')!;
                            const receptorNombre = receptor[0]?.getAttribute('Nombre')!;
                            const fechaTimbrado = timbreFiscal[0]?.getAttribute('FechaTimbrado')!;

                            const emisorPromise = createEmisorReceptor({ nombre: emisorNombre, rfc: emisorRFC, tipo: 'emisor' });
                            const receptorPromise = createEmisorReceptor({ nombre: receptorNombre, rfc: receptorRFC, tipo: 'receptor' });
                            const [ emisorResult, receptorResult ] = await Promise.all([ emisorPromise, receptorPromise ]);

                            if( (emisorResult && emisorResult.data) && ( receptorResult && receptorResult.data ) ){

                                const emisorId = JSON.parse(emisorResult.data)._id;
                                const receptorId = JSON.parse(receptorResult.data)._id;

                                const invoiceData = {
                                    fecha: myDateMX(fechaTimbrado),
                                    estado: 'sealed',
                                    folio,
                                    emisor: emisorId,
                                    receptor: receptorId,
                                    folioFiscal: uuid,
                                    fechaSellado: myDateMX(fechaTimbrado),
                                    inactivo: false,
                                    total: Number(total)
                                };
                                console.log(invoiceData);
                                const response = await createInvoice(invoiceData);
                                console.log(response.message);
                                if( !response.success ){
                                    setErrores([...errores, { folio: response.folio, message: response.message }]);
                                }
                            }
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
                    className="w-full md:w-auto bg-primaryColor hover:bg-primaryColor-hover text-white border border-primaryColor hover:border-primaryColor-hover py-1 px-3 rounded"
                >
                    Seleccionar archivos
                </button>
            </form>
            { proceso === 'procesando' && <><Spinner /><p className="text-center">Procesando...</p></> }
            { 
                proceso === 'completado' && 
                <p className="text-center text-lime-500 font-bold">Completado</p>
            }
            {
                errores.length > 0 &&
                <div>
                    <h3 className="fonst-semibold mb-5">Factura no cargadas</h3>
                    {
                        errores.map( error => 
                            <div key={error.folio+error.message}>
                                <p>Factura con folio: <span className="font-bold">{ error.folio }</span> - { error.message }</p>
                            </div>
                        )
                    }
                </div>
            }
        </>
    )
}