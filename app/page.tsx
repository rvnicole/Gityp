import { getAllFacturas } from "@/actions/factura-actions";
import { getAllCobros } from "@/actions/gestion-cobros-actions";
import { getAllOrdenesServicio } from "@/actions/orden-servicio-actions";
import { getAllPresupuestos } from "@/actions/presupuesto-actions";
import { getAllServicios } from "@/actions/servicio-actions";

// Actions para inicializar
import { 
  facturasRange,
  checkFullDataFactura,
  createInvoice,
  getFacturas,
  updateEstadoFactura,
  updateFactura 
} from "@/actions/factura-actions";
import {
  createConductor,
  deleteConductor,
  getConductoresAction,
  updateConductor
} from "@/actions/conductor-actions";
import { sendEmail } from "@/actions/email-actions";
import {
  createEmisorReceptor,
  deleteEmisorReceptor,
  getEmisorReceptor,
  updateEmisorReceptor
} from "@/actions/emisor-receptor-actions"
import { 
  cobrosRange,
  getCobros,
  updateCobro,
  updateEstadoCobro
} from "@/actions/gestion-cobros-actions";
import {
  createOrdenServicio,
  deleteOrdenServicio,
  getOrdenesServicio,
  getOrdenesServicioIDs,
  updateOrdenServicio
} from "@/actions/orden-servicio-actions"
import {
  createPresupuesto,
  deletePresupuesto,
  getPresupuestos,
  updatePresupuesto,
  updateStatusPresupuesto
} from "@/actions/presupuesto-actions"
import {
  createServicio,
  deleteServicio,
  getServicios,
  updateEstadoServicio,
  updateServicio
} from "@/actions/servicio-actions"
import {
  getConfig,
  setFolioInicial,
  updateRutas
} from "@/actions/configuracion-actions"

import { connectDB } from "@/config/db";
import { Configuracion } from "@/model/Configuracion";
import CardDashboard from "@/src/components/cards/CardDashboard";
import CardDashboardBest from "@/src/components/cards/CardDashboardBest";
import CardDashboardGanancias from "@/src/components/cards/CardDashboardGanancias";
import CardDashboardImportXml from "@/src/components/cards/CardDashboardImportXml";
import { evalDate, formatLongDate } from "@/src/lib";
import {CardServicio, DashboardDocumentsData} from "@/src/types";
import Link from "next/link";

export const revalidate = 0;

async function initConfiguracion(){
  try{
      // Inicializar las actions
      
      const initActionsFactura = {
        facturasRange,
        checkFullDataFactura,
        createInvoice,
        getFacturas,
        updateEstadoFactura,
        updateFactura
      }
      const initActionsConductor = {
        createConductor,
        deleteConductor,
        getConductoresAction,
        updateConductor
      }
      const initActionsEmail = {
        sendEmail
      }
      const initActionsEmisorReceptor = {
        createEmisorReceptor,
        deleteEmisorReceptor,
        getEmisorReceptor,
        updateEmisorReceptor
      }
      const initActionsCobros = { 
        cobrosRange,
        getCobros,
        updateCobro,
        updateEstadoCobro
      }
      const initActionsOS = {
        createOrdenServicio,
        deleteOrdenServicio,
        getOrdenesServicio,
        getOrdenesServicioIDs,
        updateOrdenServicio
      }
      const initActionsPresupuesto = {
        createPresupuesto,
        deletePresupuesto,
        getPresupuestos,
        updatePresupuesto,
        updateStatusPresupuesto
      }
      const initActionsServicio = {
        createServicio,
        deleteServicio,
        getServicios,
        updateEstadoServicio,
        updateServicio
      }

      const initActionsConfig = {
        getConfig,
        setFolioInicial,
        updateRutas
      }

      console.log(
        initActionsFactura, 
        initActionsConductor, 
        initActionsEmail,
        initActionsEmisorReceptor,
        initActionsCobros, 
        initActionsOS,
        initActionsPresupuesto,
        initActionsServicio,
        initActionsConfig
      );

      await connectDB();
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
  const dia = hoy.getDate();
  const mes = hoy.getMonth() + 1;
  const anio = hoy.getFullYear();
  //console.log("Hoy es", {dia, mes, anio});

  const serviciosProximos = servicios.filter(servicio => {
    const day = servicio.fechaEjecucion.getUTCDate();
    const month = servicio.fechaEjecucion.getUTCMonth() + 1;
    const year = servicio.fechaEjecucion.getUTCFullYear();
    //console.log("Fecha de Ejecución", {fecha: servicio.fechaEjecucion, day, month, year, estado: servicio.estado});

    if(year >= anio && ((month === mes && day >= dia) || month > mes) && (servicio.estado === "assign" || servicio.estado === "inProgress")) {
      return true;
    }
  });
  return serviciosProximos;
}

export default async function Home() {
  //const cacheControl = { cache: "no-store" };
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
