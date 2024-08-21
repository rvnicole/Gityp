import ServicioForm from "./ServicioForm";

export default function PresupuestoForm(){
    return (
        <form 
            action=""
            className="mt-10 space-y-5"
        >
            <div className="flex justify-between px-5">
                <div>
                    <label htmlFor="fecha">Fecha: </label>
                    <input id="fecha" type="date" className="p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor"/>
                </div>
                <div>
                    <label htmlFor="proveedor">Proveedor: </label>
                    <input id="proveedor" type="text" className="p-1 border border-borderColor placeholder:text-inputColor rounded w-32 focus:outline-none focus:ring-2 focus:border-ringColor"/>
                </div>
                <div>
                    <label htmlFor="solicito">Solicitó: </label>
                    <input id="solicito" type="text" className="p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor"/>
                </div>
            </div>
            <ServicioForm />
            <div className="px-5">
                <label htmlFor="subtotal">Subtotal: </label>
                <input readOnly type="number" className="p-1 placeholder:text-inputColor rounded w-24"/>
            </div>
            <div className="px-5">
                <label htmlFor="iva">IVA: </label>
                <input type="number" className="p-1 border border-borderColor placeholder:text-inputColor rounded w-24 focus:outline-none focus:ring-2 focus:border-ringColor"/>
            </div>
            <div className="px-5">
                <label htmlFor="total">Total: </label>
                <input readOnly type="number" className="p-1 placeholder:text-inputColor rounded w-24"/>
            </div>
            <div className="flex justify-end gap-5 px-5">
                <button>Cancelar</button>
                <button>Crear presupuesto</button>
            </div>
        </form>
    )
}