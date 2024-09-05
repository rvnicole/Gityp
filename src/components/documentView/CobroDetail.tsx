import { evalDate, formatCurrency, formatDate } from "@/src/lib";
import { GestionCobros } from "@/src/types";
import { ArrowTopRightOnSquareIcon, BanknotesIcon, ClockIcon, DocumentCheckIcon, DocumentCurrencyDollarIcon } from "@heroicons/react/24/outline";
import TableServicesDetails from "./TableServicesDetails";

type CobroDetailProps = {
    cobro: GestionCobros;
};

export default function CobroDetail({ cobro }: CobroDetailProps) {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 text-secondaryColor-foreground">
            <div className="md:col-span-2 md:row-span-2">
                <h3 className="mb-4 font-bold text-xl md:text-3xl text-foregroundColor break-words">Cobro #{cobro.id}</h3>
                <p><span className="font-semibold">Solicito:{' '}</span>{cobro.factura.ordenServicio.solicito}</p>
                <p><span className="font-semibold">PO:{' '}</span>{cobro.factura.ordenServicio.ordenCompra}</p>

                <a
                    className="inline-flex gap-1 justify-center items-center w-24 max-h-8 my-1 p-1 rounded-full text-sm text-white bg-charColor-char5 hover:bg-primaryColor"
                    href={cobro.factura.ordenServicio.urlOrdenCompra}
                    target="_blank"
                >
                    Ver PO
                    <ArrowTopRightOnSquareIcon className="size-5 inline"/>
                </a>
            </div>

            <div className="max-h-8	flex md:justify-end text-white text-xs md:text-sm font-semibold">
                {cobro.pagado ? (
                    <div className="flex items-center px-3 py-1 bg-lime-500 rounded-full">
                        <p className="px-3">Cobrado</p>
                        <BanknotesIcon className="size-6 inline-block" />
                    </div>
                ) : (
                    <div className="flex items-center px-3 py-1 bg-mutedColor-foreground rounded-full">
                        <p className="px-3">Por Cobrar</p>
                        <DocumentCurrencyDollarIcon className="size-6 inline-block"/>
                    </div>
                )}
            </div>

            <div className="flex flex-col md:justify-end gap-1">
                <p className="font-semibold">Fecha: {' '}
                    <span className="font-normal">{formatDate(cobro.fecha)}</span>
                </p>

                <p className="font-semibold">Proveedor: {' '}
                    <span className="font-normal">{cobro.factura.ordenServicio.proveedor}</span>
                </p>

                <p className="font-semibold">Presupuesto: {' '}
                    <span className="font-normal">#{cobro.factura.ordenServicio.presupuesto.id}</span>
                </p>

                <p className="font-semibold">Orden de Servicio: {' '}
                    <span className="font-normal">#{cobro.factura.ordenServicio.id}</span>
                </p>  

                <p className="font-semibold">Factura: {' '}
                    <span className="font-normal">#{cobro.factura.id}</span>
                </p>             
            </div>

            <div className="md:col-span-3 text-secondaryColor-foreground">                
                { cobro.edicom ? (
                    <div className="flex items-center gap-1 text-charColor-char4">
                        <DocumentCheckIcon className="size-6"/>
                        <p className="font-bold">Cargado a EDICOM</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-mutedColor-foreground">
                        <ClockIcon className="size-6"/>
                        <p className="font-bold">Por Cargar a EDICOM</p>
                    </div>
                )}

                <p className="font-semibold">IE: {' '}
                    <span className="font-normal">{cobro.ie}</span>
                </p>
            </div>

            <div className="md:col-span-3">
                <p className="font-semibold">Comentarios sobre el cobro:</p>
                <p className="text-mutedColor-foreground bg-accentColor py-2 px-1 rounded-lg">{cobro.factura.ordenServicio.comentarios}</p>
            </div>

            <div className="md:col-span-3 flex flex-col md:flex-row gap-5 text-mutedColor-foreground">
                <div>
                    <p className="font-bold text-secondaryColor-foreground">Emisor</p>

                    <p className="font-semibold">Nombre: {' '}
                        <span className="font-normal">{cobro.factura.emisor?.nombre}</span>
                    </p>

                    <p className="font-semibold">RFC: {' '}
                        <span className="font-normal">{cobro.factura.emisor?.rfc}</span>
                    </p>
                </div>

                <div className="p-1 bg-charColor-char4 rounded-lg m-2"></div>

                <div>
                    <p className="font-bold text-secondaryColor-foreground">Receptor</p>

                    <p className="font-semibold">Nombre: {' '}
                        <span className="font-normal">{cobro.factura.receptor?.nombre}</span>
                    </p>

                    <p className="font-semibold">RFC: {' '}
                        <span className="font-normal">{cobro.factura.receptor?.rfc}</span>
                    </p>
                </div>
            </div>

            <div className="md:col-span-3 text-secondaryColor-foreground">                
                <p className="font-semibold">Folio: {' '}
                    <span className="font-normal">{cobro.factura.folio}</span>
                </p>

                <p className="font-semibold">Folio Fiscal: {' '}
                    <span className="font-normal">{cobro.factura.folioFiscal}</span>
                </p>

                <p className="font-semibold">Fecha de Sellado: {' '}
                    <span className="font-normal">{cobro.factura.fechaSellado && formatDate(cobro.factura.fechaSellado)}</span>
                </p>

                <a
                    className="inline-flex gap-1 justify-center items-center w-36 max-h-8 my-1 p-1 rounded-full text-sm text-white bg-charColor-char5 hover:bg-primaryColor"
                    href={cobro.factura.urlFactura}
                    target="_blank"
                >
                    Ver Factura
                    <ArrowTopRightOnSquareIcon className="size-5 inline"/>
                </a>
            </div>

            <div className="md:col-span-3">
                <p className="font-semibold">Comentarios de la Orden de Servicio: </p>
                <p className="text-mutedColor-foreground bg-accentColor py-2 px-1 rounded-lg">{cobro.factura.ordenServicio.comentarios}</p>
            </div>

            <div className="md:col-span-3">
                <p className="font-semibold">Servicio(s)</p>
                <TableServicesDetails 
                    services={cobro.factura.ordenServicio.servicios}
                />
            </div>

            <div className="md:col-start-3 flex justify-end gap-5">
                <div className="font-semibold flex flex-col justify-between">
                    <p>Subtotal:</p>
                    <p>IVA:</p>
                    <p>Total:</p>
                </div>

                <div className="text-right">
                    <p>{formatCurrency(cobro.factura.ordenServicio.subtotal)}</p>
                    <p>{formatCurrency(cobro.factura.ordenServicio.iva)}</p>
                    <p className="font-bold text-2xl">{formatCurrency(cobro.factura.ordenServicio.total)}</p>
                </div>
            </div>
        </div>
    )
}