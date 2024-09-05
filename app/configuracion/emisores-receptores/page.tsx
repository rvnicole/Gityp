"use server"

import { connectDB } from "@/config/db";
import { EmisorReceptor } from "@/model/EmisorReceptor";
import EmisoresReceptoresView from "@/src/components/configView/emisoresReceptores/EmisoresReceptoresView";
import { PrimaryButton } from "@/src/components/ui/Buttons";
import ModalAdd from "@/src/components/ui/ModalAdd";
import { EmisoresReceptoresSchema } from "@/src/schema";
import Link from "next/link";

export const revalidate = 0;

async function getEmisoresReceptores() {
    try {
        await connectDB();

        const emisoresReceptores = await EmisorReceptor.find();
        const result = EmisoresReceptoresSchema.safeParse(emisoresReceptores);
        
        if(result) {
            return result.data;
        };
    }
    catch(error) {
        console.log(error);
    }
}

export default async function EmisoresReceptoresPage(){
    const emisorReceptor = await getEmisoresReceptores() || [];

    const emisores = emisorReceptor.filter( emisor => emisor.tipo === "emisor");
    const receptores = emisorReceptor.filter( receptor => receptor.tipo === "receptor");

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