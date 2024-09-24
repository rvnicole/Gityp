import { numberToWords } from "@/src/lib";

export function getHTMLPresupuesto() {
    try {
        const html = document.createElement('html');
        const head = document.createElement('head');
        const script = document.createElement('script');
        const body = document.createElement('body');
        //const contenedorImg = document.createElement('div');
        //const img = document.createElement('img');
        const parrafo = document.createElement('p');
        const parrafoTotal = document.createElement('p');
        const dataProveedor = ``;

        const presupuestoHtmlStr = document.querySelector('#imp-presupuesto-detalles')!;
        const estadoHtml = document.querySelector('#imp-estado')!;
        const columnasHtml = document.querySelector('#imp-title-colums')!;
        const divDataTable = document.querySelectorAll('#imp-data-table')!;
        const contenedorTableHtml = document.querySelectorAll('.imp-columns')!;
        const divDataProveedor = document.querySelector('#imp-data-proveedor')!;
        const parrafoTotalHtml = document.querySelector('.imp-data-total')!;
        const divTotales = document.querySelector('#imp-monto-letra')!;
        
        estadoHtml.remove();
        console.log(contenedorTableHtml.length);
        for( let i = contenedorTableHtml.length; i > 0; i-- ){
            console.log(contenedorTableHtml[i - 1]);
            contenedorTableHtml[i-1].remove();
        };

        for( let i = 0; i < divDataTable.length; i++ ){
            console.log({ etiqueta: divDataTable[i] });
            divDataTable[i].className = `${i % 2 !== 0 && 'bg-sky-50'} grid grid-cols-8 gap-1 p-1 border-b border-borderColor`
            
            const spans = divDataTable[i].querySelectorAll('span');
            for( let i = 0; i < spans.length; i++ ){
                spans[i].remove();
            }
        };

        const total = Number(parrafoTotalHtml.getAttribute('data-set')!);
        const centavos = total.toFixed(2).toString().split('.')[1];
        divDataProveedor.innerHTML = divDataProveedor.innerHTML + dataProveedor;
        columnasHtml.classList.add('bg-sky-500', 'text-white', 'grid-cols-8');  
        columnasHtml.parentElement!.className = '';
        script.setAttribute('src', "https://cdn.tailwindcss.com");
        parrafo.textContent = 'Se requiere Orden de compra antes del servicio';
        parrafo.classList.add('font-semibold', 'text-slate-600', 'text-center', 'mt-10');
        parrafoTotal.classList.add('p-5', 'text-center', 'font-semibold', 'uppercase', 'col-span-6');
        parrafoTotal.textContent = numberToWords(Math.floor(total)) + ` ${centavos}/100 M.N.`;
        parrafoTotalHtml.classList.add('text-base');
        divTotales.className = "grid grid-cols-8";
        body.classList.add('px-5');
        //contenedorImg.classList.add('w-full','flex','justify-center', 'mb-3');
        //img.className = 'w-64';
        //img.src = location.origin+"/logo.png";

        divTotales.insertBefore(parrafoTotal,divTotales.firstChild);
        head.appendChild(script);
        //contenedorImg.appendChild(img);
        //body.appendChild(contenedorImg);
        body.appendChild(presupuestoHtmlStr);
        body.appendChild(parrafo);
        html.appendChild(head);
        html.appendChild(body);

        console.log(location);
        console.log(html);

        return html;
    }
    catch(error) {
        console.log("Error: ", error);
    }
}