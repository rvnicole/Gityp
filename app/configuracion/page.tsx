import { connectDB } from "@/config/db";
import { Configuracion } from "@/model/Configuracion";
import CardIconConfig from "@/src/components/cards/CardIconConfig";
import { UnderlineIcon } from "@heroicons/react/24/outline";

async function initConfiguracion(){
    try{
        await connectDB();
        const config = await Configuracion.find().limit(1);
        if( config.length === 0 ){
            const configParams = {
                folioInicial: 0,
                plantillas: {
                    nombre: 'default',
                    tipo: 'impresion'
                }
            }
            const configuracion = new Configuracion(configParams);
            await configuracion.save();
            console.log('configuracion inicial creada');
        }
    }
    catch(error){
        console.log(error);
    }
}

export default async function ConfigurationPage() {
    await initConfiguracion();

    return (
        <div className="flex items-center h-[85%] px-2 py-4">
            <div className="grid gap-5 m-auto md:grid-cols-2 sm:grid-cols-1 lg:w-2/3 md:w-full">
                <CardIconConfig
                    option='Conductores'
                    url='/configuracion/conductores'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 48 48" className="m-auto">
                        <g fill="currentColor"><path d="M21 11a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1"/>
                            <path fillRule="evenodd" d="M33.364 18.52c-.363.285-.834.513-1.402.698Q32 19.604 32 20a8 8 0 1 1-15.962-.782c-.568-.185-1.039-.413-1.401-.698c-.47-.37-.785-.864-.822-1.458c-.035-.551.183-1.019.401-1.349a4.3 4.3 0 0 1 .76-.841q.212-.184.406-.327q-.058-.309-.122-.74A27 27 0 0 1 15 10c0-.314.134-.548.196-.647c.078-.125.17-.232.254-.318c.167-.175.383-.353.62-.524c.48-.348 1.14-.739 1.924-1.105C19.557 6.676 21.704 6 24 6s4.443.677 6.006 1.406a12 12 0 0 1 1.924 1.105c.237.171.453.35.62.524c.084.086.176.193.254.318c.062.099.196.333.196.647c0 1.602-.13 2.9-.26 3.805q-.064.432-.122.74c.128.095.267.204.407.327c.25.219.536.504.759.841c.219.33.436.798.402 1.35c-.037.593-.352 1.087-.822 1.457m-16.362-8.202c.015 1.348.127 2.438.238 3.2q.04.27.076.482h13.368q.037-.213.076-.482c.11-.762.223-1.852.238-3.2a4 4 0 0 0-.241-.188c-.361-.261-.909-.59-1.597-.911C27.777 8.573 25.924 8 24 8s-3.777.573-5.16 1.219c-.688.321-1.236.65-1.596.91a4 4 0 0 0-.242.19M16.788 16l-.003.002a5 5 0 0 0-.495.376c-.178.156-.32.308-.406.44a1 1 0 0 0-.055.093l.044.037c.15.118.472.291 1.1.462q.186.05.399.098l.009.002c.502.111 1.12.21 1.873.288c1.067.111 2.41.184 4.088.2L24 18c3.227 0 5.314-.201 6.62-.49l.008-.002q.214-.047.4-.098c.627-.17.95-.344 1.099-.462l.044-.037a1 1 0 0 0-.054-.093a2.4 2.4 0 0 0-.407-.44a5 5 0 0 0-.494-.376L31.212 16zm6.94 4c2.642 0 4.69-.14 6.26-.384q.012.19.012.384a6 6 0 1 1-11.992-.315c1.463.202 3.338.315 5.72.315m-7.65 18.877A8 8 0 0 0 16 40v1a1 1 0 0 1-1.864.504a3 3 0 0 1-2.203.259l-1.932-.518a3 3 0 0 1-2.12-3.674l.776-2.898a3 3 0 0 1 3.674-2.121l1.932.517c.672.18 1.23.575 1.618 1.091a9.99 9.99 0 0 1 8.12-4.16a9.99 9.99 0 0 1 8.116 4.158a3 3 0 0 1 1.616-1.088l1.932-.517a3 3 0 0 1 3.674 2.12l.777 2.899a3 3 0 0 1-2.122 3.674l-1.931.517a3 3 0 0 1-2.2-.256A1 1 0 0 1 32 41v-1a8 8 0 0 0-.078-1.123l-5.204 1.395a3 3 0 0 1-5.436 0zm5.042-.72A3 3 0 0 1 23 36.172v-4.11a8.01 8.01 0 0 0-6.397 4.886zm10.277-1.21A8.01 8.01 0 0 0 25 32.062v4.109c.904.32 1.61 1.06 1.88 1.987zm2.147-.72a1 1 0 0 1 .707-1.225l1.932-.518a1 1 0 0 1 1.224.707l.777 2.898a1 1 0 0 1-.707 1.225l-1.932.518a1 1 0 0 1-1.225-.708zm-21.73-1.743a1 1 0 0 0-1.226.707l-.776 2.897a1 1 0 0 0 .707 1.225l1.932.518a1 1 0 0 0 1.225-.707l.776-2.898A1 1 0 0 0 13.745 35zM25 39a1 1 0 1 1-2 0a1 1 0 0 1 2 0" clipRule="evenodd"/>
                        </g>
                    </svg>
                </CardIconConfig>

                <CardIconConfig
                    option='Emisores / Receptores'
                    url='/configuracion/emisores-receptores'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" className="m-auto">
                        <path fill="currentColor" d="m4.921 15.173l2.74 2.74q.141.14.15.342q.01.2-.15.366q-.165.165-.356.165t-.357-.165l-3.383-3.383q-.13-.13-.183-.267t-.053-.298t.053-.298t.184-.267l3.388-3.389q.146-.146.344-.153t.364.159q.16.165.162.354t-.162.354l-2.74 2.74h6.886q.213 0 .357.143t.143.357t-.143.357t-.357.143zM19.08 9.808h-6.887q-.213 0-.356-.144t-.144-.356t.144-.357t.356-.143h6.887l-2.74-2.74q-.141-.141-.15-.342t.15-.366q.165-.166.356-.166q.192 0 .357.166l3.383 3.382q.13.131.183.267q.053.137.053.299t-.053.298q-.052.136-.183.267l-3.389 3.389q-.146.146-.344.153q-.198.006-.363-.16q-.16-.164-.163-.353t.163-.354z"/>
                    </svg>
                </CardIconConfig>

                <CardIconConfig
                    option='Importacion de XML de Facturas'
                    url='/configuracion/importacion-xml'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="80" viewBox="0 0 16 16" className="m-auto">
                        <path fill="currentColor" d="m9 10.114l1.85-1.943a.52.52 0 0 1 .77 0c.214.228.214.6 0 .829l-1.95 2.05a1.55 1.55 0 0 1-2.31 0L5.41 9a.617.617 0 0 1 0-.829a.52.52 0 0 1 .77 0L8 10.082V1.556C8 1.249 8.224 1 8.5 1s.5.249.5.556zM4.18 6a.99.99 0 0 0-.972.804l-1.189 6Q2 12.9 2 13c0 .552.444 1 .99 1h11.02q.098 0 .194-.02a1 1 0 0 0 .778-1.176l-1.19-6a.99.99 0 0 0-.97-.804zM6 5v1h5V5h1.825c.946 0 1.76.673 1.946 1.608l1.19 6A2 2 0 0 1 14.016 15H2.984a1.992 1.992 0 0 1-1.945-2.392l1.19-6C2.414 5.673 3.229 5 4.174 5z"/>
                    </svg>
                </CardIconConfig>

                { /*<CardIconConfig
                    option='Plantillas PDF de Presupuestos y/o Facturas'
                    url='/configuracion/plantillas'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="80" viewBox="0 0 16 16" className="m-auto">
                        <path fill="currentColor" fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173q.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38a.57.57 0 0 1-.238.241a.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181q.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084q0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592a1.1 1.1 0 0 1-.196.422a.8.8 0 0 1-.334.252a1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"/>
                    </svg>
                </CardIconConfig>*/}

                <CardIconConfig
                    option='Configuración de Rutas'
                    url='/configuracion/rutas'
                >
                    <UnderlineIcon className="w-16 h-20 m-auto" />
                </CardIconConfig>
            </div>
        </div>
    )
}