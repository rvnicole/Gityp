export default function ErrorMessage({ children }: { children: React.ReactNode }){
    return (
        <p className="p-1 text-destructiveColor font-bold inline">{children}</p>
    )
};