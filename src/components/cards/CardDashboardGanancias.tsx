"use client"
import { facturasRange } from "@/actions/factura-actions";
import { cobrosRange } from "@/actions/gestion-cobros-actions";
import { useEffect, useState } from "react";
import { SelectMonth, SelectYear } from "../ui/Selects";
import { formatCurrency } from './../../lib/index';



export default function CardDashboardGanancias() {
    const [filtros, setFiltros] = useState<{mes: string, anio:string}>({mes: '', anio: new Date().getFullYear().toString()});
    const [ganancias, setGanancias] = useState<{facturado: number, pagado: number, porPagar: number}>({facturado: 0, pagado: 0, porPagar: 0});

    useEffect(() => {
        const getCobros = async () => {
            //const [cobros, facturas] = await Promise.all([getCobrosByRangeDate(filtros), getFacturasByRangeDate(filtros)]);
            const cobros = await cobrosRange(filtros);
            const facturas = await facturasRange(filtros);
            const data = {facturado: 0, pagado: 0, porPagar: 0};
            console.log({cobros, facturas});

            cobros!.data.forEach(cobro => {
                if( cobro.pagado ) {
                    const total = cobro.factura.ordenServicio ? cobro.factura.ordenServicio.total : 0;
                    data.pagado = data.pagado + total;
                }
                else if( !cobro.pagado ) {
                    const total = cobro.factura.ordenServicio ? cobro.factura.ordenServicio.total : 0;
                    data.porPagar = data.porPagar + total!;
                }
            });

            const selladas = facturas!.data.filter(factura => factura.estado === "sealed");
            data.facturado = selladas.reduce((suma, factura) => factura.ordenServicio ? suma + factura.ordenServicio.total : suma, 0);

            setGanancias(data);
        }
        
        getCobros();
    }, [filtros]);

    return (
        <div 
            className="p-6 bg-backgroundColor border border-borderColor rounded-xl"
        >
            <div className="flex justify-between flex-col text-center md:flex-row">
                <h3 className="text-mutedColor-foreground text-2xl font-bold">Ganancias</h3>

                <div className="flex gap-6 justify-center mt-4 md:mt-0">
                    <SelectMonth onChange={(event) => setFiltros({...filtros, mes: event!.target.value})}/>
                    <SelectYear onChange={(event) => setFiltros({...filtros, anio: event!.target.value})}/>
                </div>
            </div>

            <div className="flex justify-around mt-8 text-center flex-col md:flex-row">
                <div className="my-3">
                    <p className="text-secondaryColor-foreground text-4xl font-bold">{formatCurrency(ganancias.facturado)}</p>
                    <p className="text-mutedColor-foreground font-semibold mt-2">Facturado</p>
                </div>

                <div className="my-3">
                    <p className="text-secondaryColor-foreground text-4xl font-bold">{formatCurrency(ganancias.pagado)}</p>
                    <p className="text-mutedColor-foreground font-semibold mt-2">Cobrado</p>
                </div>

                <div className="my-3">
                    <p className="text-secondaryColor-foreground text-4xl font-bold">{formatCurrency(ganancias.porPagar)}</p>
                    <p className="text-mutedColor-foreground font-semibold mt-2">Por cobrar</p>
                </div>
            </div>
        </div>
    )
}