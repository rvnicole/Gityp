import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
export default function SearchBar(){

    return(
        <form>
            <div className="flex items-center">
                <button className="bg-backgroundColor hover:bg-charColor-char4 hover:text-white font-bold py-2 px-2 border border-input rounded-t-none rounded-b-none rounded-l-lg">
                    <MagnifyingGlassIcon className="size-7"/>
                </button>
                <input 
                    type="search" 
                    placeholder="Buscar..."
                    className="border-t border-b border-r border-input py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:opacity-50 w-full rounded-t-none rounded-r-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>
        </form>
    )
};