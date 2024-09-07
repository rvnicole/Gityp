import RutasForm from "@/src/components/formularios/configuracionForms/RutasForm";

export default function PageRutas() {
    return (
        <>
            <section className="bg-backgroundColor p-10 border border-borderColor rounded-xl space-y-5">
                <h1 className="text-mutedColor-foreground text-xl font-bold">Ruta de Ordenes de Compra(PO)</h1>
                <RutasForm tipo="ordenesCompra"/>
            </section>

            <div className="p-5"><hr /></div>

            <section className="bg-backgroundColor p-10 border border-borderColor rounded-xl space-y-5">
                <h1 className="text-mutedColor-foreground text-xl font-bold">Ruta de PDF de Facturas</h1>
                <RutasForm tipo="facturas"/>
            </section>
        </>
    )
}