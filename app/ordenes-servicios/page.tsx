import { connectDB } from "@/config/db";
import { OrdenServicio } from "@/model/OrdenServicio";
import CardTable from "@/src/components/cards/CardTable";
import Spinner from "@/src/components/ui/Spinner";
import { CardsOrdenServicioSchema } from "@/src/schema";

export const revalidate = 0;

async function getOrdenesServicio() {
    try {
        await connectDB();

        const ordenesServicio = await OrdenServicio.find().sort({ fecha: -1 });
        const {success, data} = CardsOrdenServicioSchema.safeParse(ordenesServicio);
        
        if(success) {
            return data;
        };
    }
    catch(error) {
        console.log(error);
    }
}

export default async function OrdenesServiciosPage() {
    const ordenesServicios = await getOrdenesServicio() || [];

    return (
        <>
            <CardTable
                documents={ordenesServicios}
                documentType="ordenes-servicios"
            />
            <Spinner />
        </>
    )
}