"use client"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FunnelIcon } from '@heroicons/react/24/outline';

type FilterBarProps = {
    opciones: string[]
}

export default function FilterBar( { opciones }: FilterBarProps ){

    return(
        <Menu>
            <MenuButton 
                className="flex  items-center gap-1 bg-white hover:bg-borderColor text-secondaryColor-foreground border border-borderColor py-1 px-5 rounded"
            >
                <FunnelIcon className="size-4"/> Filtrar
            </MenuButton>
            <MenuItems 
                anchor="bottom"
                className="px-5 bg-white border border-borderColor rounded"
            >
            {
                opciones.map( opcion => 
                    <MenuItem key={opcion[0]}>
                        <a className="block w-full data-[focus]:bg-blue-100" href={`?estado=${opcion[0]}`}>
                            {opcion[1]}
                        </a>
                    </MenuItem>
                )
            }
        </MenuItems>
      </Menu>
    );
}