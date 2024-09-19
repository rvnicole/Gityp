import { estadosFactura } from "@/src/data/data";
import { evalDate, formatCurrency, formatDate } from "@/src/lib";
import { EstadoFactura, Factura } from "@/src/types";
import { ArrowTopRightOnSquareIcon, CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import TableServicesDetails from "./TableServicesDetails";

type FacturaDetailProps = {
    factura: Factura;
};

export default function FacturaDetail({ factura }: FacturaDetailProps) {
    console.log(factura);

    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 text-secondaryColor-foreground">
            <div className="md:col-span-2 md:row-span-2">
                <h3 className="mb-4 font-bold text-xl md:text-3xl text-foregroundColor break-words">Factura #{factura.id}</h3>
                <p><span className="font-semibold">Solicito:{' '}</span>{factura.ordenServicio?.solicito}</p>
                <p><span className="font-semibold">PO:{' '}</span>{factura.ordenServicio?.ordenCompra}</p>

                <a
                    className="inline-flex gap-1 justify-center items-center w-24 max-h-8 my-1 p-1 rounded-full text-sm text-white bg-charColor-char5 hover:bg-primaryColor"
                    href={factura.ordenServicio?.urlOrdenCompra ? factura.ordenServicio.urlOrdenCompra: ''}
                    target="_blank"
                >
                    Ver PO
                    <ArrowTopRightOnSquareIcon className="size-5 inline"/>
                </a>
            </div>

            <div className="max-h-8	flex md:justify-end text-white text-xs md:text-sm font-semibold">
                { factura.estado === "notsealed" && (
                    <div className="flex items-center px-3 py-1 bg-mutedColor-foreground rounded-full">
                        <p className="px-3">{estadosFactura[factura.estado as EstadoFactura]} {' '}</p>
                        <XMarkIcon className="size-6 inline-block"/>
                    </div>
                )}

                { factura.estado === "sealed" && (
                    <div className="flex items-center px-3 py-1 bg-lime-500 rounded-full">
                        <p className="px-3">{estadosFactura[factura.estado as EstadoFactura]} {' '}</p>
                        <CheckBadgeIcon className="size-6 inline-block" />
                    </div>
                )}
            </div>

            <div className="flex flex-col md:justify-end gap-1">
                <p className="font-semibold">Fecha: {' '}
                    <span className="font-normal">{formatDate(factura.fecha)}</span>
                </p>

                <p className="font-semibold">Proveedor: {' '}
                    <span className="font-normal">{ factura.ordenServicio?.proveedor ? factura.ordenServicio.proveedor : ''}</span>
                </p>

                <p className="font-semibold">Presupuesto: {' '}
                    <span className="font-normal">#{factura.ordenServicio?.presupuesto.id}</span>
                </p>

                <p className="font-semibold">Orden de Servicio: {' '}
                    <span className="font-normal">#{factura.ordenServicio?.id}</span>
                </p>               
            </div>

            <div className="md:col-span-3 flex flex-col md:flex-row gap-5 text-mutedColor-foreground">
                <div>
                    <p className="font-bold text-secondaryColor-foreground">Emisor</p>

                    <p className="font-semibold">Nombre: {' '}
                        <span className="font-normal">{factura.emisor ? factura.emisor.nombre : ''}</span>
                    </p>

                    <p className="font-semibold">RFC: {' '}
                        <span className="font-normal">{factura.emisor ? factura.emisor.rfc : ''}</span>
                    </p>
                </div>

                <div className="p-1 bg-charColor-char4 rounded-lg m-2"></div>

                <div>
                    <p className="font-bold text-secondaryColor-foreground">Receptor</p>

                    <p className="font-semibold">Nombre: {' '}
                        <span className="font-normal">{factura.receptor ? factura.receptor.nombre : ''}</span>
                    </p>

                    <p className="font-semibold">RFC: {' '}
                        <span className="font-normal">{factura.receptor ? factura.receptor.rfc : ''}</span>
                    </p>
                </div>
            </div>

            <div className="md:col-span-3 text-secondaryColor-foreground">                
                <p className="font-semibold">Folio: {' '}
                    <span className="font-normal">{factura.folio}</span>
                </p>

                <p className="font-semibold">Folio Fiscal: {' '}
                    <span className="font-normal">{factura.folioFiscal ? factura.folioFiscal : ''}</span>
                </p>

                <p className="font-semibold">Fecha de Sellado: {' '}
                    <span className="font-normal">{factura.fechaSellado ? formatDate(factura.fechaSellado) : ''}</span>
                </p>

                <a
                    className="inline-flex gap-1 justify-center items-center w-36 max-h-8 my-1 p-1 rounded-full text-sm text-white bg-charColor-char5 hover:bg-primaryColor"
                    href={factura.urlFactura}
                    target="_blank"
                >
                    Ver Factura
                    <ArrowTopRightOnSquareIcon className="size-5 inline"/>
                </a>
            </div>

            {   factura.ordenServicio ?
                <>
                    <div className="md:col-span-3">
                        <p className="font-semibold">Comentarios de la Orden de Servicio:</p>
                        <p className="text-mutedColor-foreground bg-accentColor py-2 px-1 rounded-lg">{factura.ordenServicio.comentarios}</p>
                    </div>

                    <div className="md:col-span-3">
                        <p className="font-semibold">Servicio(s)</p>
                        <TableServicesDetails 
                            services={factura.ordenServicio.servicios}
                        />
                    </div>

                    <div className="md:col-start-3 flex justify-end gap-5">
                        <div className="font-semibold flex flex-col justify-between">
                            <p>Subtotal:</p>
                            <p>IVA:</p>
                            <p>Total:</p>
                        </div>

                        <div className="text-right">
                            <p>{formatCurrency(factura.ordenServicio.subtotal)}</p>
                            <p>{formatCurrency(factura.ordenServicio.iva)}</p>
                            <p className="font-bold text-2xl">{formatCurrency(factura.ordenServicio.total)}</p>
                        </div>
                    </div>
                </>
                :
                <div className="md:col-start-3 flex justify-end gap-5">
                    <div className="font-semibold flex flex-col justify-between">
                        <p>Subtotal:</p>
                        <p>IVA:</p>
                        <p>Total:</p>
                    </div>

                    <div className="text-right">
                        <p>{formatCurrency( factura.total! / 1.16 )}</p>
                        <p>{formatCurrency( factura.total! - ( factura.total! / 1.16 ) )}</p>
                        <p className="font-bold text-2xl">{formatCurrency( factura.total! )}</p>
                    </div>
                </div>
            }
        </div>
    )
}