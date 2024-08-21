"use client"

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonsProps = {
    children: ReactNode;
    onClick?: () => void;
    attributes?: ButtonHTMLAttributes<HTMLButtonElement>
}

export function OutlineButton({ children, onClick, attributes }: ButtonsProps) {
    return (
        <button 
            className="bg-white hover:bg-borderColor text-secondaryColor-foreground border border-borderColor py-1 px-3 rounded"
            onClick={onClick}
            {...attributes}
        >
            {children}
        </button>
    )
}

export function PrimaryButton({ children, onClick, attributes }: ButtonsProps) {
    return (
        <button 
            className="bg-primaryColor hover:bg-primaryColor-hover text-white border border-primaryColor hover:border-primaryColor-hover py-1 px-3 rounded"
            onClick={onClick}
            {...attributes}
        >
            {children}
        </button>
    )
}

export function SecondaryButton({ children, onClick, attributes }: ButtonsProps) {
    return (
        <button 
            className="bg-secondaryColor hover:bg-secondaryColor-hover text-secondaryColor-foreground border border-secondaryColor hover:border-secondaryColor-hover py-1 px-3 rounded"
            onClick={onClick}
            {...attributes}
        >
            {children}
        </button>
    )
}

export function DestructiveButton({ children, onClick, attributes }: ButtonsProps) {
    return (
        <button 
            className="bg-destructiveColor hover:bg-destructiveColor-hover text-destructiveColor-foreground border border-destructiveColor hover:border-destructiveColor-hover py-1 px-3 rounded"
            onClick={onClick}
            {...attributes}
        >
            {children}
        </button>
    )
}