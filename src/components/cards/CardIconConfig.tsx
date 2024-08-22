import Link from "next/link";
import { ReactNode } from "react";

type CardIconConfigProps = {
    children: ReactNode;
    option: string;
    url: string;
}

export default function CardIconConfig({ children, option, url }: CardIconConfigProps) {
    return (
        <div 
            className="bg-backgroundColor py-5 px-2 border border-borderColor rounded-xl text-mutedColor-foreground text-center hover:bg-charColor-char4 hover:border-charColor-char4 hover:text-white"
        >
            <Link 
                href={url}
            >
                {children}
                <p className="p-3">{option}</p>
            </Link>
        </div>
    )
}