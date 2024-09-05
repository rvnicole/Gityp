import { connectDB } from "@/config/db";
import { GestionCobro } from "@/model/GestionCobro";
import CardTable from "@/src/components/cards/CardTable";
import ModalAdd from "@/src/components/ui/ModalAdd";
import { CardCobrosSchema } from "@/src/schema";

async function getCobros() {
    try {
        await connectDB();

        const cobros = await GestionCobro.find()
            .populate([ { path: 'factura', populate: { path: 'ordenServicio' } }])
            .sort({ fecha: -1 });

        console.log("Cobros", cobros);

        const {success, data, error} = CardCobrosSchema.safeParse(cobros);
        
        if(success) {
            return data;
        };

        error.issues.forEach( error => console.log(error));
    }
    catch(error) {
        console.log(error);
    }
}

export default async function GetionCobrosPage() {
    const cobros = await getCobros() || [];

    return (
        <>
            <CardTable
                documents={cobros}
                documentType="gestion-cobros"
            />

            <ModalAdd documentType="gestionCobro" />
        </>
    )
}