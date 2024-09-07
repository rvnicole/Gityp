import puppeteer from "puppeteer";

export const formatCurrency = ( amount: number ) => {
    return Intl.NumberFormat('es-MX',{
        style: "currency",
        currency: "MXN"
    }).format(amount);
};

export const formatDate = (date: Date) => {
    return Intl.DateTimeFormat('es-MX').format(date);
};

export const formatLongDate = (date: Date) => {
    return Intl.DateTimeFormat('es-MX', {
        dateStyle:"full"
    }).format(date);
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

export const numberToWords = (num: number) => {
    if (num === 0) return "cero";

    const units = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
    const teens = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
    const tens = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
    const hundreds = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
    const thousands = ["", "mil"];
    const millions = ["", "un millón"];

    function convertToWords(num: number): string {
        if (num < 10) return units[num];
        if (num < 20) return teens[num - 10];
        if (num < 100) return (num === 20 ? "veinte" : tens[Math.floor(num / 10)] + (num % 10 ? " y " + units[num % 10] : ""));
        if (num < 1000) return (num === 100 ? "cien" : hundreds[Math.floor(num / 100)] + (num % 100 ? " " + convertToWords(num % 100) : ""));
        if (num < 1000000) {
            const thousandPart = Math.floor(num / 1000);
            const remainder = num % 1000;
            return (thousandPart === 1 ? "mil" : convertToWords(thousandPart) + " mil") + (remainder ? " " + convertToWords(remainder) : "");
        }
        if (num === 1000000) return millions[1];
        return "";
    }
    const prev = convertToWords(num).trim();
    return prev.includes('veinte y') ? prev.replace(/veinte y /g, 'veinti') : prev;
};


