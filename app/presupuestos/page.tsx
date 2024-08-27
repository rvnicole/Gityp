import CardTable from "@/src/components/cards/CardTable";
import { PrimaryButton } from "@/src/components/ui/Buttons";
import ModalAdd from "@/src/components/ui/ModalAdd";
import Link from "next/link";

export default function PresupuestoPage() {
    const documents = [
        {
            id: '6699c12b1f9d4e7812fa7274',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            total: 1000,
            estado: 'pending'
        },
        {
            id: '6699c12b1f9d4e7812fa7273',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            total: 1000,
            estado: 'pending'
        },
        {
            id: '6699c12b1f9d4e7812fa7272',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            total: 1000,
            estado: 'pending'
        },
        {
            id: '6699c12b1f9d4e7812fa7271',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            total: 1000,
            estado: 'pending'
        }
    ];

    return (
        <div className="space-y-5">
            <div className="flex justify-center md:justify-end">
                <Link href="/presupuestos?modal=create">
                    <PrimaryButton>Crear Presupuesto</PrimaryButton>
                </Link>
            </div>

            <CardTable
                documents={documents}
                documentType="presupuestos"
            />
            <ModalAdd documentType="presupuesto"/>
        </div>
    )
}