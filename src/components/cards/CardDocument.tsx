import { ReactNode } from "react";

type CardDocumentProps = {
    children: ReactNode
}

export default function CardDocument({children}: CardDocumentProps) {
    return (
        <div 
            className="p-7 bg-backgroundColor border border-borderColor rounded-xl text-mutedColor-foreground hover:shadow-lg hover:shadow-charColor-char4"
        >
            {children}
        </div>
    )
}