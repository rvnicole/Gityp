import { getAllFacturas } from "@/actions/factura-actions";
import { getAllCobros } from "@/actions/gestion-cobros-actions";
import { getAllOrdenesServicio } from "@/actions/orden-servicio-actions";
import { getAllPresupuestos } from "@/actions/presupuesto-actions";
import { getAllServicios } from "@/actions/servicio-actions";
import { Configuracion } from "@/model/Configuracion";
import CardDashboard from "@/src/components/cards/CardDashboard";
import CardDashboardBest from "@/src/components/cards/CardDashboardBest";
import CardDashboardGanancias from "@/src/components/cards/CardDashboardGanancias";
import CardDashboardImportXml from "@/src/components/cards/CardDashboardImportXml";
import { evalDate, formatLongDate } from "@/src/lib";
import {CardServicio, DashboardDocumentsData} from "@/src/types";
import Link from "next/link";

async function initConfiguracion(){
  try{
      const config = await Configuracion.find();
      if( config.length === 0 ){
          const configParams = {
              folioInicial: 0,
              plantillas: {
                  nombre: 'default',
                  tipo: 'impresion'
              }
          }
          const configuracion = new Configuracion(configParams);
          await configuracion.save();
          console.log('configuracion inicial creada');
      }
  }
  catch(error){
      console.log(error);
  }
}

function getServiciosProximos(servicios: CardServicio[]) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  console.log(hoy);

  const serviciosProximos = servicios.filter(servicio => servicio.fechaEjecucion >= hoy && (servicio.estado === "assign" || servicio.estado === "inProgress"));
  return serviciosProximos;
}

export default async function Home() {
  await initConfiguracion();
  const presupuestos = await getAllPresupuestos() as DashboardDocumentsData;
  const ordenesServicios = await getAllOrdenesServicio() as DashboardDocumentsData;
  const servicios = await getAllServicios() as DashboardDocumentsData;
  const facturas = await getAllFacturas() as DashboardDocumentsData;
  const cobros = await getAllCobros() as DashboardDocumentsData;

  const serviciosProximos = getServiciosProximos(servicios.data as CardServicio[]);

  return (
    <div className="space-y-3">
      <div className="py-3 w-full grid gap-5 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
        <CardDashboard title="Presupuestos" type="presupuestos" documents={presupuestos}/>
        <CardDashboard title="Ordenes de Servicio" type="ordenes-servicios" documents={ordenesServicios}/>

        <div className="row-span-2">
          <CardDashboard title="Servicios" type="servicios" documents={servicios}>
            <div className="w-full p-1 bg-charColor-char4 rounded-lg my-5"></div>
            <p className="text-mutedColor-foreground text-sm font-bold mb-1">Próximos Servicios</p>

            { serviciosProximos.map(servicio => (
              <div key={servicio.id} className="py-1 px-2 rounded-xl hover:text-accentColor-foreground hover:bg-accentColor">
                <Link href={`/servicios/${servicio.id}`} title="Ver Servicio" target="_blank">
                  <p className="text-mutedColor-foreground text-sm text-left font-semibold">Servicio #{servicio.id}</p>
                  <p className="text-mutedColor-foreground text-sm text-left">{formatLongDate(new Date(evalDate(servicio.fechaEjecucion)))}</p>
                </Link>
              </div>
            ))}
          </CardDashboard>
        </div>

        <CardDashboard title="Facturas" type="facturacion" documents={facturas}/>
        <CardDashboard title="Gestión de Cobro" type="gestion-cobros" documents={cobros}/>
      </div>

      <CardDashboardGanancias />
      <CardDashboardBest />
      <CardDashboardImportXml />
    </div>
  );
}
