"use server"

import { connectDB } from "@/config/db";
import CardTable from "@/src/components/cards/CardTable";
import { PrimaryButton } from "@/src/components/ui/Buttons";
import ModalAdd from "@/src/components/ui/ModalAdd";
import Link from "next/link";
import { formatDate } from "@/src/lib";
import { FechasDuplicadasType } from "@/src/types";
import { Servicio } from "@/model/Servicio";
import { CardsServiciosSchema } from "@/src/schema";

async function getServicios() {
    try {
        await connectDB();

        const servicios = await Servicio.find({
            ordenServicio: { $ne: null }
          })
          .populate([
            { path: 'idConductor' },
            { path: 'ordenServicio'}
        ]);
        console.log("Servicios",servicios)

        const {success, data, error} = CardsServiciosSchema.safeParse(servicios);
        
        if(success) {
            return data;
        }
        else {
            error.issues.forEach( error => console.log(error));
        }
    }
    catch(error) {
        console.log(error);
    }
}

export default async function ServiciosPage() {
    const servicios = await getServicios() || [];
    //console.log("Servicios", servicios)

    const fechasDuplicadas: FechasDuplicadasType = {};
    servicios.forEach( document => fechasDuplicadas[formatDate(document.fechaEjecucion)] = fechasDuplicadas[formatDate(document.fechaEjecucion)] ? fechasDuplicadas[formatDate(document.fechaEjecucion)] + 1 : 1);

    return (
        <div className="space-y-5">
            <div className="flex justify-center md:justify-end">
                <Link href="/servicios?modal=create">
                    <PrimaryButton>Crear Servicio</PrimaryButton>
                </Link>
            </div>

            <CardTable
                documents={servicios}
                documentType="servicios"
                fechasDuplicadas={fechasDuplicadas}
            />

            <ModalAdd 
                documentType="servicio"
            />
        </div>
    )
}