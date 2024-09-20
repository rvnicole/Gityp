"use client"
import { getConfig } from "@/actions/configuracion-actions";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

type ButtonOpenFileProps = {
    url: string,
    document: string
}

export default function ButtonOpenFile({url, document}: ButtonOpenFileProps){

    const handleClick = async (url: string) => {
        console.log('abriendo...', url);
        console.log(window);
        if( 'electron' in window && 'openFile' in window.electron && url ){
            console.log('Entra e intanta abrir');
            const config = await getConfig();
            if( config.rutas ){
                window.electron.openFile(`${document === 'PO' ? config.rutas.ordenesCompra : config.rutas.facturas}/${url}.pdf`);
            }            
        }
    };

    return(
        <button
            className="cursor-pointer flex gap-1 justify-center items-center w-32 max-h-8 my-1 p-1 rounded-full text-sm text-white bg-charColor-char5 hover:bg-primaryColor"
            onClick={() => handleClick(url)}
        >
            Ver { document }
            <ArrowTopRightOnSquareIcon className="size-5 inline"/>
        </button>
    )
}