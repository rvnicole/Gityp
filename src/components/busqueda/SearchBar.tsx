"use client"
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MouseEvent, useState } from "react";

export default function SearchBar(){
    const router = useRouter();
    const [ busqueda, setBusqueda ] = useState('');

    const handleClickSearch = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const arrUrl = location.pathname.split('/');
        const document = arrUrl.length > 0 && arrUrl[1] ? arrUrl[1] : 'global';
        if(document !== 'search' && busqueda){
            router.push(`/search?document=${document}&q=${busqueda}`);
            console.log('tansa');
        }
        else if(busqueda){
            const params = new URLSearchParams(location.search);
            const document = params.get('document');
            console.log(document);
            router.push(`/search?document=${document}&q=${busqueda}`);
        }
    };

    return(
        <form>
            <div className="flex items-center border border-inputColor rounded-lg">
                <button
                    className="bg-backgroundColor text-foregroundColor hover:bg-charColor-char4 hover:text-white font-bold py-2 px-2 border rounded"
                    onClick={handleClickSearch}
                >
                    <MagnifyingGlassIcon className="size-7"/>
                </button>
                <input 
                    type="search" 
                    placeholder="Buscar..."
                    className="py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:opacity-50 w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    onChange={(e) => setBusqueda(e.target.value)}
                    value={busqueda}
                />
            </div>
        </form>
    )
};