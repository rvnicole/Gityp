"use client"

import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, Children, ReactNode } from "react";

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

export function OutlineRoundButton({ children, onClick, attributes }: ButtonsProps) {
    return (
        <button 
            className="bg-white hover:bg-borderColor text-secondaryColor-foreground border border-borderColor px-3 rounded-full"
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
            className="bg-primaryColor hover:bg-primaryColor-hover text-white border border-primaryColor hover:border-primaryColor-hover py-1 px-3 rounded w-full md:w-auto"
            onClick={onClick}
            {...attributes}
        >
            {children}
        </button>
    )
}

export function PrimaryRoundButton({ children, onClick, attributes }: ButtonsProps) {
    return (
        <button 
            className="bg-primaryColor hover:bg-primaryColor-hover text-white border border-primaryColor hover:border-primaryColor-hover px-3 rounded-full"
            onClick={onClick}
            {...attributes}
        >
            {children}
        </button>
    )
}

export function PrimaryShortButton({ children, onClick, attributes }: ButtonsProps) {
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

export function SecondaryRoundButton({ children, onClick, attributes }: ButtonsProps) {
    return (
        <button 
            className="bg-secondaryColor hover:bg-secondaryColor-hover text-secondaryColor-foreground border border-secondaryColor hover:border-secondaryColor-hover px-3 rounded-full"
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

export function DestructiveRoundButton({ children, onClick, attributes }: ButtonsProps) {
    return (
        <button 
            className="bg-destructiveColor hover:bg-destructiveColor-hover text-destructiveColor-foreground border border-destructiveColor hover:border-destructiveColor-hover px-3 rounded-full"
            onClick={onClick}
            {...attributes}
        >
            {children}
        </button>
    )
}

export function ConfirmButton({ children, onClick, attributes }: ButtonsProps) {
    return (
        <button 
            className="bg-lime-500 hover:bg-lime-400 text-destructiveColor-foreground py-1 px-3 rounded"
            onClick={onClick}
            {...attributes}
        >
            {children}
        </button>
    )
}

export function ConfirmRoundButton({ children, onClick, attributes }: ButtonsProps) {
    return (
        <button 
            className="bg-lime-500 hover:bg-lime-400 text-destructiveColor-foreground px-3 rounded-full"
            onClick={onClick}
            {...attributes}
        >
            {children}
        </button>
    )
}

export function BackButton({ children, onClick, attributes }: ButtonsProps){
    const router = useRouter();
    return (
        <button
            className="text-white bg-inputColor p-1 rounded-full hover:bg-primaryColor hidden md:block"
            onClick={() => router.back()}
        >
            {children}
        </button>
    );
};