import CardTable from "@/src/components/cards/CardTable";
import { PrimaryButton } from "@/src/components/ui/Buttons";

export default function PresupuestoPage() {
    const documents = [
        {
            id: '6699c12b1f9d4e7812fa7273',
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
            id: '6699c12b1f9d4e7812fa7273',
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
        }
    ];

    return (
        <div className="space-y-5">
            <div className="flex justify-end">
                <PrimaryButton>Crear Presupuesto</PrimaryButton>
            </div>

            <CardTable
                documents={documents}
                documentType="presupuestos"
                documentTitle="Presupuesto"
            />
        </div>
    )
}