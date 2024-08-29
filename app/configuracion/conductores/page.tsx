import { connectDB } from "@/config/db";
import { Conductor } from "@/model/Conductor";
import ConductoresView from "@/src/components/configView/conductores/ConductoresView";
import { PrimaryButton } from "@/src/components/ui/Buttons";
import ModalAdd from "@/src/components/ui/ModalAdd";
import { ConductoresArrSchema } from "@/src/schema";
import { Conductores } from "@/src/types";
import Link from "next/link";

export async function getConductores(){
    await connectDB();
    const res = await Conductor.find();
    const { success, data } = ConductoresArrSchema.safeParse(res);
    if( success ){
        return data;
    };
};

export default async function ConductoresPage(){
    
    const conductores = await getConductores();

    if(conductores) return(
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