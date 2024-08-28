import ConductoresView from "@/src/components/configView/conductores/ConductoresView";
import { PrimaryButton } from "@/src/components/ui/Buttons";
import ModalAdd from "@/src/components/ui/ModalAdd";
import Link from "next/link";

const conductores = [
    {
        id: 'as09i909012390opasd',
        nombre: 'Eduardo',
        apellido: 'Reynoso',
        edad: 64,
        licencia: 'AT-503'
    },
    {
        id: 'as09i90901239001923',
        nombre: 'Eduardo',
        apellido: 'Vera',
        edad: 55,
        licencia: 'BP-540'
    }
]

export default function ConductoresPage(){
    
    return(
        <>
            <div className="flex justify-end mb-5">
                <Link href="?modal=create">
                    <PrimaryButton>Nuevo conductor</PrimaryButton>
                </Link>            
            </div>
            <section className="bg-backgroundColor p-10 border border-borderColor rounded-xl space-y-5">
                <h1 className="text-mutedColor-foreground text-xl font-bold">Conductores</h1>
                <div className="space-y-5">
                    <ConductoresView conductores={conductores}/>
                </div>                
            </section>
            <ModalAdd documentType="conductor"/>
        </>
    )
}