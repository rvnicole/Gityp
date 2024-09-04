export const formatCurrency = ( amount: number ) => {
    return Intl.NumberFormat('es-MX',{
        style: "currency",
        currency: "MXN"
    }).format(amount);
};

export const formatDate = (date: Date) => {
    return Intl.DateTimeFormat('es-MX').format(date)
};

export const evalDate = ( fecha: Date | string ) => {
    if( typeof fecha !== 'string' ){
        const year = fecha.getFullYear();
        const mes = fecha.getMonth() + 1 < 10 ? "0"+(fecha.getMonth() + 1 ) : fecha.getMonth() + 1;
        const dia = fecha.getDate()+ 1 < 10 ? "0"+(fecha.getDate() + 1 ) : fecha.getDate() + 1;
        return `${year}-${mes}-${dia}T00:00:00`;
    }
    else{
        return fecha+'T00:00:00';
    };
};