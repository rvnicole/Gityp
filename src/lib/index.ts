export const formatCurrency = ( amount: number ) => {
    return Intl.NumberFormat('es-MX',{
        style: "currency",
        currency: "MXN"
    }).format(amount);
};

export const formatDate = (date: Date) => {
    return Intl.DateTimeFormat('es-MX',{
        dateStyle:"short"
    }).format(date)
};