
import CobroDetail from "@/src/components/documentView/CobroDetail";
import DocumentDetail from "@/src/components/documentView/DocumentDetail";
import ModalEdit from "@/src/components/ui/ModalEdit";

export default function GestionCobroIDPage({ params }: { params: {gestionCobroID: string}}) {
    const { gestionCobroID } = params;

    const ordenServicio = {
        id: '6699c12b1f9d4e7812fa7274',
        fecha: new Date(),
        proveedor: 'Pruebas',
        solicito: 'Fulanita',
        subtotal: 900,
        iva: 100,
        total: 1000,
        estado: 'assign',
        comentarios: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget. Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.', 
        ordenCompra: '123456',
        urlOrdenCompra: 'https://heroicons.com/outline',
        presupuesto: {
            id: '6699c12b1f9d4e7812fa7274',
            fecha: new Date(),
            proveedor: 'Pruebas',
            solicito: 'Fulanita',
            subtotal: 900,
            iva: 100,
            total: 1000,
            estado: 'pending',
            comentarios: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget. Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
            servicios: [
                {
                    id: '6699c12b1f9d4e7812fa7272',
                    ordenServicio: {
                        id: '6699c12b1f9d4e7812fa7271',
                        solicito: 'Fulanita',
                        urlOrdenCompra: '/ejemplo',
                        ordenCompra: '67890'
                    },
                    fechaEjecucion: new Date(),
                    descripcion: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
                    costo: 1000,
                    tipoServicio: 'paqueteria',
                    idConductor: {
                        id: 'as',
                        nombre: 'Nombre',
                        apellido: 'Apellido'
                    },
                    nota: 'Ut vitae nulla hendrerit.',
                    estado: 'assign'
                },
                {
                    id: '6699c12b1f9d4e7812fa7272',
                    ordenServicio: {
                        id: '6699c12b1f9d4e7812fa7271',
                        solicito: 'Fulanita',
                        urlOrdenCompra: '/ejemplo',
                        ordenCompra: '67890'
                    },
                    fechaEjecucion: new Date(),
                    descripcion: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
                    costo: 1000,
                    tipoServicio: 'paqueteria',
                    idConductor: {
                        id: 'as',
                        nombre: 'Nombre',
                        apellido: 'Apellido'
                    },
                    nota: 'Ut vitae nulla hendrerit.',
                    estado: 'assign'
                },
                {
                    id: '6699c12b1f9d4e7812fa7272',
                    ordenServicio: {
                        id: '6699c12b1f9d4e7812fa7271',
                        solicito: 'Fulanita',
                        urlOrdenCompra: '/ejemplo',
                        ordenCompra: '67890'
                    },
                    fechaEjecucion: new Date(),
                    descripcion: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
                    costo: 1000,
                    tipoServicio: 'paqueteria',
                    idConductor: {
                        id: 'as',
                        nombre: 'Nombre',
                        apellido: 'Apellido'
                    },
                    nota: 'Ut vitae nulla hendrerit.',
                    estado: 'assign'
                }
            ]
        },
        servicios: [
            {
                id: '6699c12b1f9d4e7812fa7272',
                ordenServicio: {
                    id: '6699c12b1f9d4e7812fa7271',
                    solicito: 'Fulanita',
                    urlOrdenCompra: '/ejemplo',
                    ordenCompra: '67890'
                },
                fechaEjecucion: new Date(),
                descripcion: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
                costo: 1000,
                tipoServicio: 'paqueteria',
                idConductor: {
                    id: 'as',
                    nombre: 'Nombre',
                    apellido: 'Apellido'
                },
                nota: 'Ut vitae nulla hendrerit.',
                estado: 'assign'
            },
            {
                id: '6699c12b1f9d4e7812fa7272',
                ordenServicio: {
                    id: '6699c12b1f9d4e7812fa7271',
                    solicito: 'Fulanita',
                    urlOrdenCompra: '/ejemplo',
                    ordenCompra: '67890'
                },
                fechaEjecucion: new Date(),
                descripcion: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
                costo: 1000,
                tipoServicio: 'paqueteria',
                idConductor: {
                    id: 'as',
                    nombre: 'Nombre',
                    apellido: 'Apellido'
                },
                nota: 'Ut vitae nulla hendrerit.',
                estado: 'assign'
            },
            {
                id: '6699c12b1f9d4e7812fa7272',
                ordenServicio: {
                    id: '6699c12b1f9d4e7812fa7271',
                    solicito: 'Fulanita',
                    urlOrdenCompra: '/ejemplo',
                    ordenCompra: '67890'
                },
                fechaEjecucion: new Date(),
                descripcion: 'Ut suscipit mollis felis, accumsan ultricies mauris sollicitudin eget.',
                costo: 1000,
                tipoServicio: 'paqueteria',
                idConductor: {
                    id: 'as',
                    nombre: 'Nombre',
                    apellido: 'Apellido'
                },
                nota: 'Ut vitae nulla hendrerit.',
                estado: 'assign'
            }
        ]
    }

    const factura = {
        id: '6699c12b1f9d4e7812fa984',
        ordenServicio: ordenServicio,
        fecha: new Date(),
        urlFactura: 'url',
        emisor: {
            id:'1',
            nombre: 'Eduardo Reynoso Gonzalez',
            rfc: 'REGE6003152Q7'
        },
        receptor: {
            id: '2',
            nombre: 'Unilever de México',
            rfc: 'UME123045RF09'
        },
        folio: '1450',
        folioFiscal: crypto.randomUUID(),
        fechaSellado: new Date(),
        estado: 'sellado'
    }

    const gestionCobro = {
        id: '6699c12b1f9d4e7812fa102',
        factura: factura,
        ie: '1203940959',
        edicom: true,
        pagado: false,
        comentarios: 'Este es un comentario'
    };


    return (
        <>
            <DocumentDetail 
                documentID={gestionCobroID}
            >
                <CobroDetail 
                    cobro={gestionCobro}
                />
            </DocumentDetail>
            
            <ModalEdit 
                documentType="gestionCobro" 
                defaultValues={gestionCobro}
            />
        </>
    )
}