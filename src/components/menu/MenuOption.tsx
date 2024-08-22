import Link from "next/link";
import { ReactNode } from "react";

type MenuOptionProps = {
    children: ReactNode;
    option: string;
    url: string;
    showMenu: boolean;
}

export default function MenuOption({ children, option, url, showMenu}: MenuOptionProps) {
    return (
        <Link
            className="flex items-center p-2 mx-1 rounded-xl hover:text-accentColor-foreground hover:bg-accentColor"
            href={url}
        >
            {children}
            { showMenu && <p className="px-2 w-32">{option}</p>}
        </Link>

    )
}