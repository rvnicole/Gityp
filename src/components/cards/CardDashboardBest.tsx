import { GestionCobro } from "@/model/GestionCobro";
import { OrdenServicio } from "@/model/OrdenServicio";
import { Servicio } from "@/model/Servicio";
import { mesesEspanol } from "@/src/data/data";
import { formatCurrency } from "@/src/lib";
import { Factura, GestionCobros, OrdenServicio as OrdenServicioType, Servicio as ServicioType } from "@/src/types";

type ObjectoAuxiliar = { 
    [key:number]: { 
        cuenta: number, 
        acumulado: number 
    } 
};

async function getCurrentYearData(){
    try{
        const year = new Date().getFullYear();
        
        const serviciosPromise = Servicio.find({ 
            fechaEjecucion: { 
                $gte: new Date(`${year}-01-01`), 
                $lte: new Date(`${year}-12-31`)
            },
            estado: 'complete' 
        });
        
        const ordenesServiciosPromise = OrdenServicio.find({ 
            fecha: { 
                $gte: new Date(`${year}-01-01`), 
                $lte: new Date(`${year}-12-31`)
            },
            estado: 'complete' 
        });

        const gestionCobrosPromise = GestionCobro.find({ 
            fecha: { 
                $gte: new Date(`${year}-01-01`), 
                $lte: new Date(`${year}-12-31`)
            },
            pagado: true
        })
        .populate({ path: 'factura', populate: { path: 'ordenServicio' } });

        const [ servicios, ordenesServicios, gestionCobros ] = await Promise.all([ serviciosPromise, ordenesServiciosPromise, gestionCobrosPromise ]);
        
        return {
            servicios: servicios as ServicioType[],
            ordenesServicios: ordenesServicios as OrdenServicioType[],
            gestionCobros: gestionCobros as GestionCobros[]
        };

    }
    catch(error){
        console.log(error);
    }
}



export default async function CardDashboardBest(){
    const { servicios, ordenesServicios, gestionCobros } = await getCurrentYearData() || { servicios: [], ordenesServicios: [], gestionCobros: [] };

    
    const serviceMonths: ObjectoAuxiliar = { };
    const cobroMonths: ObjectoAuxiliar = { };
    const osSolicito: { [key: string]: number } = { };

    /* Obtener el mes con mayor numero de servicios realizados */
    // Arma el objeto con los 12 meses y sus servicios realizados
    servicios.forEach( servicio => {
        const mes = new Date(servicio.fechaEjecucion).getMonth();
        if( serviceMonths[mes]  ){
            serviceMonths[mes].cuenta = serviceMonths[mes].cuenta + 1;
            serviceMonths[mes].acumulado = serviceMonths[mes].acumulado + Number(servicio.costo);
        }
        else{
            serviceMonths[mes] = {
                cuenta: 1,
                acumulado: Number(servicio.costo)
            }
        }
    });

    // Obtén el mes con mayor número de servicios realizados
    const masServiciosArr = Object.values(serviceMonths).map( service => service.cuenta );
    const masServicios = Math.max(...masServiciosArr);
    const entries = Object.entries(serviceMonths);
    const indiceMasServicios = entries.findIndex( servicio => servicio[1].cuenta === masServicios );
    const mesMasServicios = entries[indiceMasServicios][0];
    const acumuladoMes = entries[indiceMasServicios][1].acumulado;

    /* Mes con mayor recaudacion */
    gestionCobros.forEach( cobro => {
        const mes = new Date(cobro.fecha).getMonth();
        if( cobroMonths[mes]  ){
            cobroMonths[mes].cuenta = cobroMonths[mes].cuenta + 1;
            cobroMonths[mes].acumulado = cobroMonths[mes].acumulado +  Number(cobro.factura.ordenServicio ? cobro.factura.ordenServicio.total : cobro.factura.total);
        }
        else{
            cobroMonths[mes] = {
                cuenta: 1,
                acumulado: Number(cobro.factura.ordenServicio ? cobro.factura.ordenServicio.total : cobro.factura.total)
            }
        }
    });

    const entriesRecaudacion = Object.entries(cobroMonths);
    const mayorRecaudacionArr = entriesRecaudacion.map( mesCobro => mesCobro[1].acumulado );
    const mayorRecaudacion = Math.max(...mayorRecaudacionArr);
    const mesMayorRecaudacionIndice = entriesRecaudacion.findIndex( mesCobro => mesCobro[1].acumulado === mayorRecaudacion );
    const mesMayorRecaudacion = entriesRecaudacion[mesMayorRecaudacionIndice][0];


    /* Mejor cliente */
    ordenesServicios.forEach( os => {
        if( osSolicito[os.solicito] ){
            osSolicito[os.solicito] = osSolicito[os.solicito] + Number(os.total); 
        }
        else{
            osSolicito[os.solicito] = Number(os.total);
        };
    });

    const entriesSolicito = Object.entries(osSolicito);
    const solicitoMayoTotalArr = entriesSolicito.map( os => {
        return os[1] 
    });
    const mayorTotalSolicitado = Math.max(...solicitoMayoTotalArr);
    const findSolicito = entriesSolicito.find( os => os[1] === mayorTotalSolicitado );
    const solicito = findSolicito ? findSolicito[0] : 'Importacion xml'

    return (
        <div className="py-3 w-full grid gap-5 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
            <div 
                className="py-6 px-4 bg-backgroundColor border border-borderColor rounded-xl text-center space-y-3"
            >
                <h3 className="text-mutedColor-foreground text-lg font-semibold">Mes con mas servicios</h3>
                <hr />
                <p className="text-mutedColor-foreground font-bold text-2xl">{ mesesEspanol[+mesMasServicios] }</p>
                <div className="grid grid-cols-2">
                    <p className="text-xl">{masServicios}</p>
                    <p className="text-2xl font-bold">{ formatCurrency(acumuladoMes) }</p>
                    <p className="text-mutedColor-foreground text-center">Servicios realizados</p>
                    <p className="text-mutedColor-foreground text-center">Costo acumulado</p>
                </div>                
            </div>
            <div 
                className="py-6 px-4 bg-backgroundColor border border-borderColor rounded-xl text-center space-y-3"
            >
                <h3 className="text-mutedColor-foreground text-lg font-semibold">Mes con mayor recaudación</h3>
                <hr />
                <p className="text-mutedColor-foreground font-bold text-2xl">{ mesesEspanol[+mesMayorRecaudacion] }</p>
                <div className="grid grid-cols-1">
                    <p className="text-2xl font-bold">{ formatCurrency(mayorRecaudacion) }</p>
                    <p className="text-mutedColor-foreground text-center">Total cobrado</p>
                </div>                
            </div>
             <div 
                className="py-6 px-4 bg-backgroundColor border border-borderColor rounded-xl text-center space-y-3"
            >
                <h3 className="text-mutedColor-foreground text-lg font-semibold">Mejor cliente</h3>
                <hr />
                <p className="text-mutedColor-foreground font-bold text-2xl">{ solicito }</p>
                <div className="grid grid-cols-1">
                    <p className="text-2xl font-bold">{ formatCurrency(+mayorTotalSolicitado) }</p>
                    <p className="text-mutedColor-foreground text-center">Total</p>
                </div>                
            </div>
        </div>
    )
}