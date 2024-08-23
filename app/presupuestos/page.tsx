import CardTable from "@/src/components/cards/CardTable";

export default function PresupuestoPage() {
    const documents = [
        {
            id: '1234567',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            total: 1000,
            estado: 'En espera de aprobación'
        }
    ];

    return (
        <>
            <CardTable
                documentType="presupuestos"
                documents={documents}
            />
        </>
    )
}