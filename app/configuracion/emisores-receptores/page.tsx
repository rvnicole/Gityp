import EmisoresReceptoresView from "@/src/components/configView/emisoresReceptores/EmisoresReceptoresView";
import { PrimaryButton } from "@/src/components/ui/Buttons";
import ModalAdd from "@/src/components/ui/ModalAdd";
import Link from "next/link";

const emisores = [
    {
        id: 'aslñkdaskldas0123',
        nombre: 'Eduardo Reynoso Gonzalez',
        rfc: 'REGE6003152Q7'
    }
]

const receptores = [
    {
        id: 'aalskmdas2134km342',
        nombre: 'Unilever de México',
        rfc: 'UME13049955AD'
    },
    {
        id: 'aalskmdas2134km3489',
        nombre: 'Servicios Profesionales S.A de C.V',
        rfc: 'SER1021394AD4'
    }
]

export default function EmisoresReceptoresPage(){
    return(
        <>
            <div className="flex justify-end mb-5">
                <Link href="?modal=create">
                    <PrimaryButton>Agregar entidad</PrimaryButton>
                </Link>
            </div>
            <section className="bg-backgroundColor p-10 border border-borderColor rounded-xl space-y-5">
                <h1 className="text-mutedColor-foreground text-xl font-bold">Emisores</h1>
                <EmisoresReceptoresView emisores={emisores}/>              
            </section>
            <div className="p-5"><hr /></div>
            <section className="bg-backgroundColor p-10 border border-borderColor rounded-xl space-y-5">
                <h1 className="text-mutedColor-foreground text-xl font-bold">Receptores</h1>
                <EmisoresReceptoresView receptores={receptores}/>           
            </section>
            <ModalAdd documentType="emisor-receptor"/>
        </>
    )
};