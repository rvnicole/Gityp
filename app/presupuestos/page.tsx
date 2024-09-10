import { connectDB } from "@/config/db";
import { Presupuesto } from "@/model/Presupuesto";
import CardTable from "@/src/components/cards/CardTable";
import { PrimaryButton } from "@/src/components/ui/Buttons";
import ModalAdd from "@/src/components/ui/ModalAdd";
import Spinner from "@/src/components/ui/Spinner";
import { CardsPresupuestoSchema } from "@/src/schema";
import Link from "next/link";

export const revalidate = 0;

async function getPresupuestos(){
    try{
        await connectDB();
        const presupuestos = await Presupuesto.find().sort({ fecha: -1 });
        const { success, data, error } = CardsPresupuestoSchema.safeParse(presupuestos);
        if( success ){
            return data;
        };
        error.issues.forEach( issue => console.log(issue));
    }
    catch(error){
        console.log(error);
    }
};

export default async function PresupuestoPage() {
    const presupuestos = await getPresupuestos() || [];

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-end gap-5">
                <div className="flex justify-center md:justify-end">
                    <Link href="/presupuestos?modal=create">
                        <PrimaryButton>Crear Presupuesto</PrimaryButton>
                    </Link>
                </div>
            </div>

            <CardTable
                documents={presupuestos}
                documentType="presupuestos"
            />
            <ModalAdd documentType="presupuesto"/>
            <Spinner />
        </div>
    )
}