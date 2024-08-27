"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationPath(){
    const fullPath = usePathname();
    const paths = fullPath.substring(1).split('/');

    return(
        <nav className="text-foregroundColor font-semibold">
            <ol>
                {
                    paths.map( (path, index) => 
                        <li 
                            key={index}
                            className="inline"
                        >
                            <Link href={ index === 0 ? '/' + path : paths.slice(index,index+1).join('/')}>
                                {path.charAt(0).toUpperCase() + path.slice(1).replace('-',' ')} 
                            </Link>
                            { index < paths.length - 1 && <span className="px-1">{' > '}</span> } 
                        </li>  
                    )
                }
            </ol>
        </nav>
    );
};