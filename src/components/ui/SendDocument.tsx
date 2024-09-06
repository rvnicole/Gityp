"use client"
import { Presupuesto } from "@/src/types"
import { useRouter } from "next/navigation"
import { SecondaryRoundButton } from "./Buttons"

type DeleteDocumentProps ={
    documentType?: 'presupuesto' | 'factura' |  'ordenServicio' | 'gestionCobro' | 'servicio' | 'conductor' | 'emisor-receptor',
    documentID: string
}

export default function SendDocument( { documentType, documentID }: DeleteDocumentProps ){
    const router = useRouter();
    
    if( documentType === 'presupuesto' ){

        return (
            <>
                <SecondaryRoundButton onClick={() => router.push('?modal=send')}>Enviar</SecondaryRoundButton>
            </>
        )
    }
    
    else{
        return <></>
    }
};