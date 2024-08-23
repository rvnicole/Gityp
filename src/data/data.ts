export const estadosServicio = [
    { estado: 'Asignado', value: 'assign' },
    { estado: 'En progreso', value: 'inProgress' },
    { estado: 'Completado', value: 'complete' },
    { estado: 'No realizado', value: 'noShow' }
];

export const tiposServicio = [
    { tipo: 'Transporte de Personal', value: 'personal' },
    { tipo: 'Paquetería', value: 'paqueteria' }
];

export const estadosPresupuesto = {
    pending: 'En espera de aprobación',
    accept: 'Aprobado',
    reject: 'Rechazado'
};

export const estadosOrdenServicio = {
    assign: 'Asignado',
    inprogress: 'En progreso',
    complete: 'Completado',
    unrealized: 'No realizado'
};

export const estadosFactura = {
    sealed: 'Sellado',
    notsealed: 'No sellado'
};

export const estadosCobro = {
    paid: 'Pagado',
    pending: 'Pendiente de pago'
};