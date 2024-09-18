"use client"

import { SelectHTMLAttributes, ChangeEvent } from "react";

type SelectProps = {
    onChange?: (event: ChangeEvent<HTMLSelectElement>|void) => void;
    attributes?: SelectHTMLAttributes<HTMLSelectElement>;
}


export function SelectMonth({onChange, attributes}: SelectProps) {
    const meses = [
        {name: "Enero", value: "01"},
        {name: "Febrero", value: "02"},
        {name: "Marzo", value: "03"},
        {name: "Abril", value: "04"},
        {name: "Mayo", value: "05"},
        {name: "Junio", value: "06"},
        {name: "Julio", value: "07"},
        {name: "Agosto", value: "08"},
        {name: "Septiembre", value: "09"},
        {name: "Octubre", value: "10"},
        {name: "Noviembre", value: "11"},
        {name: "Diciembre", value: "12"}
    ];

    return (
        <div>
            <label htmlFor="select-mes" className="m-auto text-mutedColor-foreground">Mes: </label>
            <select 
                id="select-mes"
                className="p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor"
                defaultValue=""
                onChange={onChange}
                {...attributes}
            >
                <option key="" value="">Todos</option>
                { meses.map(mes => <option key={mes.value} value={mes.value}>{mes.name}</option>)}
            </select>
        </div>
    )
}

export function SelectYear({onChange, attributes}: SelectProps) {
    const currentYear = new Date().getFullYear();
    const startYear = 2020;

    const years = Array.from({length: currentYear - startYear + 1 }, (_, i) => currentYear - i);

    return (
        <div>
            <label htmlFor="select-mes" className="m-auto text-mutedColor-foreground">Año: </label>
            <select 
                className="p-1 border border-borderColor placeholder:text-inputColor rounded focus:outline-none focus:ring-2 focus:border-ringColor"
                defaultValue={currentYear}
                onChange={onChange}
                {...attributes}
            >
                { years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
        </div>
    )
}