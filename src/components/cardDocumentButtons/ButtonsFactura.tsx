"use client"

import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { ConfirmButton, OutlineButton, SecondaryButton } from "../ui/Buttons";
import { ArrowUpOnSquareIcon, CheckBadgeIcon, EyeIcon } from "@heroicons/react/24/outline";
import { estadosFactura } from "@/src/data/data";
import type { CardFactura, EstadoFactura, Factura } from "@/src/types";
import { checkFullDataFactura, updateEstadoFactura, updateFactura } from "@/actions/factura-actions";
import { flushSync } from "react-dom";
import Spinner from "../ui/Spinner";
import { createEmisorReceptor } from "@/actions/emisor-receptor-actions";
import { myDateMX } from "@/src/lib";

type ButtonsPresupuestosProps = {
    documentID: CardFactura['id'];
    estadoDocument: EstadoFactura;
}

export default function ButtonsFactura({documentID, estadoDocument}: ButtonsPresupuestosProps) {
    const ref = useRef<HTMLInputElement | null>(null);
    const [estado, setEstado] = useState<EstadoFactura>(estadoDocument);
    const [ proceso, setProceso ] = useState('standby');
    const [ errores, setErrores ] = useState('');
    const router = useRouter();

    const handleClickSealed = async (id: Factura['id']) => {
        const resCheck = await checkFullDataFactura(id);
        if( !resCheck.success ){
            router.push(`/facturacion/?documentID=${documentID}&modal=create`);
            return;
        };

        const res = await updateEstadoFactura(id);
        alert(res.message);
        if( res.success ){
            setEstado('sealed');
        };              
    };

    const handleClickUpload = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        ref.current!.click();
    }

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>, documentID: Factura['id']) => {
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
 
                            const emisor = JSON.parse(emisorResult.data);
                            const receptor = JSON.parse(receptorResult.data);
 
                            const invoiceData = {
                                fecha: myDateMX(fechaTimbrado),
                                estado: 'sealed',
                                folio,
                                emisor: { ...emisor, id: emisor._id },
                                receptor: { ...receptor, id: receptor._id },
                                folioFiscal: uuid,
                                fechaSellado: myDateMX(fechaTimbrado)
                            };

                            const response = await updateFactura(invoiceData, documentID);
                            if( response.success ){
                                setProceso('completado');
                                setEstado('sealed');
                            }
                            else{
                                setErrores(response.message as string);
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
            <p className={`${estado === "sealed" ? "text-lime-500 font-bold" : "text-mutedColor-foreground"} pt-2 italic`}>
                {estadosFactura[estado]}
            </p>

            <div className="flex justify-center gap-3 mt-4">
                <OutlineButton 
                    onClick={() => router.push(`/facturacion/${documentID}`)}
                    attributes={{ title: "Ver Factura"}}
                >
                    <EyeIcon className="size-7"/>
                </OutlineButton>

                { estado === "notsealed" && ( 
                    <>                   
                        <ConfirmButton
                            onClick={() => handleClickSealed(documentID)}
                            attributes={{ title: "Sellado"}}
                        >
                            <CheckBadgeIcon className="size-7 text-white"  />
                        </ConfirmButton>
                        <button
                            onClick={(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> ) => handleClickUpload(e)}
                            className="bg-secondaryColor hover:bg-secondaryColor-hover text-secondaryColor-foreground border border-secondaryColor hover:border-secondaryColor-hover py-1 px-3 rounded"
                            title="Importar información desde XML"
                        >
                            <ArrowUpOnSquareIcon className="size-7" />
                        </button>
                        <input 
                            ref={ref}
                            type="file" 
                            accept=".xml"
                            className="hidden"
                            onChange={(e) => handleChangeInput(e, documentID)}
                        />
                    </>
                )} 
                
            </div>  
            { proceso === 'procesando' && <><Spinner /><p className="text-center">Procesando...</p></> }
            { 
                proceso === 'completado' && 
                <p className="text-center text-lime-500 font-bold mt-5">Completado</p>
            }
            {
                errores &&
                <div>
                    <h3 className="fonst-semibold mb-5">Factura no cargadas</h3>
                    <p>Factura con folio: <span className="font-bold">{ errores }</span></p>
                </div>
            }          
        </>
    )
}