import { PrimaryButton } from "@/src/components/ui/Buttons";

export default function ImportacionXMLPage(){
    return(
        <>
            <section className="bg-backgroundColor p-10 border border-borderColor rounded-xl space-y-5">
                <h1 className="text-mutedColor-foreground text-xl font-bold">Importación de facturas en formato XML</h1>
                <p>Seleccione y agregue a la base de datos multiples facturas en formato XML para poder visualizarlas en el sistema</p>
                <PrimaryButton>Seleccionar</PrimaryButton>
            </section>
        </>
    )
}