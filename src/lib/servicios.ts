import { OrdenServicio, Servicio } from "../types";

export function determinaEstadoOS(ordenServicio: OrdenServicio, servicioID: Servicio['id'], estado: Servicio['estado']) {
    const serviciosEstados = ordenServicio.servicios.map(servicio => servicio.id === servicioID ? estado : servicio.estado);
    const serviciosInAssign = serviciosEstados.every(estado => estado === "assign");

    if(serviciosEstados.includes("assign") && serviciosInAssign) {
        return "assign";
    }
    else if(serviciosEstados.includes("inProgress") || serviciosEstados.includes("assign")) {
        return "inProgress";
    }
    else if(serviciosEstados.includes("complete")) {
        return "complete";
    }
    else if(serviciosEstados.includes("noShow")) {
        return "noShow";
    }
}

export function calculaMontos(ordenServicio: OrdenServicio, servicioID: Servicio['id'], newCosto: Servicio['costo'] ) {
    const costoServicios = ordenServicio.servicios.reduce((suma:number, servicio: Servicio) => servicio.id === servicioID ? suma : suma + servicio.costo, 0);
    const subtotal = costoServicios + newCosto;
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    return {subtotal, iva, total};
}