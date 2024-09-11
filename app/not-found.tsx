import Link from "next/link";

export default function PageNotFound() {
    return (
        <div className="flex justify-center align-middle m-10">
            <div className="md:w-1/2 bg-backgroundColor border border-borderColor rounded-xl p-5 text-center">
                <h1 className="text-7xl text-mutedColor-foreground font-bold">404</h1>

                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" className="text-mutedColor-foreground m-auto">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.463 4.5c-.318.128-.6.289-.856.49q-.301.24-.554.523C2 6.693 2 8.463 2 12s0 5.306 1.053 6.487q.253.284.554.522C4.862 20 6.741 20 10.5 20h3c2.992 0 4.757 0 6-.5M8 4.016C8.728 4 9.554 4 10.5 4h3c3.759 0 5.638 0 6.892.99q.302.24.555.523C22 6.693 22 8.463 22 12c0 2.313 0 3.87-.294 5M2 2l20 20M2.5 9H9m12.5 0h-8"/>
                </svg>
                
                <h2 className="text-3xl text-mutedColor-foreground m-5 font-semibold">La página no ha sido encontrada</h2>
                
                <Link 
                    className="bg-secondaryColor hover:bg-secondaryColor-hover text-secondaryColor-foreground py-2 px-3 rounded"
                    href='/'
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    )
}