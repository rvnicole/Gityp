"use client"

import { CardCobro, CardFactura, CardPresupuesto, CardServicio } from "@/src/types";
import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type FiltersProps = {
    estados: [string, string][] | string[][],
    setData: Dispatch<SetStateAction<CardPresupuesto[]>> | Dispatch<SetStateAction<CardServicio[]>> |  Dispatch<SetStateAction<CardFactura[]>> | Dispatch<SetStateAction<CardCobro[]>> ,
    setTotalData: Dispatch<SetStateAction<number>>,
    setPage: Dispatch<SetStateAction<number>>,
    setSearchParams: Dispatch<SetStateAction<{ estado: string; fecha: string; }>>
}

export default function Filters( {estados, setData, setTotalData, setPage, setSearchParams}: FiltersProps ){
    
    const [ fecha, setFecha ] = useState('');

    const resetData = () => {
        setData([]);
        setTotalData(0);
        setPage(0);
    }

    const handleTodos = () => {
        resetData();
        setFecha('');        
        //router.push('/presupuestos');
        setSearchParams({ estado: '', fecha: ''});
    }

    const handleChangeFilter = (estado: string) => {
        resetData();
        setSearchParams( state => ({ ...state, estado }) );

        /*
        const urlParams = new URLSearchParams(location.search);
        const fecha = urlParams.get('fecha') || '';
        const searchURL = fecha ? `?estado=${estado}&fecha=${fecha}` : `?estado=${estado}`;
        router.push(location.pathname + searchURL);
        */
    }

    const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        resetData();
        setFecha(e.target.value);

        setSearchParams( state => ({ ...state, fecha: e.target.value }) );

        /*
        const urlParams = new URLSearchParams(location.search);
        const estado = urlParams.get('estado') || '';
        const searchURL = estado ? `?estado=${estado}&fecha=${e.target.value}` : `?fecha=${e.target.value}`; 
        router.push(location.pathname + searchURL);
        */
    };

    return(
        <div className="flex gap-5">
            <form>
                <input 
                    type="date" 
                    className="px-3 shadow"
                    onChange={ (e) => handleChangeDate(e)}
                    value={fecha}
                />
            </form>
            {
                estados ?
                    <div className="px-3 bg-white rounded shadow">
                        <Menu>
                            <MenuButton className="flex gap-1">
                                <FunnelIcon className="size-6" /> Filtros
                            </MenuButton>
                            <MenuItems anchor="bottom">
                                <MenuItem>
                                    <a 
                                        className="py-1 px-3 bg-white border shadow-lg border-borderColor rounded-sm block data-[focus]:bg-blue-100 cursor-pointer"
                                        onClick={() => handleTodos()}
                                    >
                                        Todo
                                    </a>
                                </MenuItem>
                                {
                                    estados.map( estado =>
                                        <MenuItem key={estado[0]}>
                                            <a 
                                                className="py-1 px-3 bg-white border shadow-lg border-borderColor rounded-sm block data-[focus]:bg-blue-100 cursor-pointer" 
                                                onClick={() => handleChangeFilter(estado[0])}
                                            >
                                                { estado[1] }
                                            </a>
                                        </MenuItem>
                                    )
                                }
                            </MenuItems>
                        </Menu>
                    </div>
                :
                    <></>
            }
        </div>
    );
}