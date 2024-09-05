"use client"
import { deleteOrdenServicio } from "@/actions/orden-servicio-actions"
import { DestructiveRoundButton } from "./Buttons"
import { deletePresupuesto } from "@/actions/presupuesto-actions"
import { OrdenServicio, Presupuesto } from "@/src/types"
import { useRouter } from "next/navigation"

type DeleteDocumentProps ={
    documentType?: 'presupuesto' | 'factura' |  'ordenServicio' | 'gestionCobro' | 'servicio' | 'conductor' | 'emisor-receptor',
    documentID: string
}

export default function DeleteDocument( { documentType, documentID }: DeleteDocumentProps ){
    const router = useRouter();
    if( documentType === 'presupuesto' ){
        const handleClick = async ( id: Presupuesto['id'] ) => {
            const res = await deletePresupuesto(id);
            alert(res.message);
            router.refresh();
            router.push('/presupuestos');
        };

        return (
            <DestructiveRoundButton onClick={ () => handleClick(documentID) }>Eliminar</DestructiveRoundButton>
        )
    }
    else if( documentType === 'ordenServicio' ){
        const handleClick = async ( id: OrdenServicio['id'] ) => {
            const respuesta = await deleteOrdenServicio(id);
           
            if( respuesta.success ) {
                alert(respuesta.message);
            }
            else {
                alert(respuesta.message);
            }

            router.refresh();
            router.push('/presupuestos');
        };

        return (
            <DestructiveRoundButton onClick={() => handleClick(documentID)}>Eliminar</DestructiveRoundButton>
        )
    }
    else{
        return <></>
    }
};