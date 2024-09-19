"use server";

import { connectDB } from "@/config/db";
import { Configuracion, IConfiguracion } from "@/model/Configuracion";
import { Ruta } from "@/src/types";

export async function getConfig(){
    try{
        await connectDB(); 

        const config = await Configuracion.find<IConfiguracion>().limit(1);
        console.log(config);
        
        if( config.length > 0 ){
            return {
                folioInicial: config[0].folioInicial,
                plantillas: config[0].plantillas,
                rutas: {
                    ordenesCompra: config[0].rutas.ordenesCompra,
                    facturas: config[0].rutas.facturas
                }
            };
        }
        else{
            const config = new Configuracion({ folioInicial: "1" });
            await config.save();
            return {
                folioInicial: config.folioInicial,
                plantillas: [],
                rutas: {ordenesCompra: '', facturas: ''}
            };
        }
    }
    catch(error){
        return {
            success: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al obtener el folio'
        }
    }
}

export async function setFolioInicial( formData: { folio: string } ){
    try{
        await connectDB();
        const { folio } = formData;
        const config = await Configuracion.find().limit(1);
        if( config.length > 0 ){
            config[0].folioInicial = folio;
            await config[0].save();
        }
        else{
            const config = new Configuracion({ folioInicial: folio });
            await config.save();
        }

        return {
            success: true,
            message: 'Folio actualizado'
        };
    }
    catch(error){
        return {
            success: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al obtener el folio'
        }
    }
}

export async function updateRutas( {ruta, tipo}: Ruta ){
    try{
        await connectDB();  

        const config = await Configuracion.find().limit(1);

        if( config.length > 0 ){
            config[0].rutas[tipo] = ruta;
            await config[0].save();
        }
        else {
            const config = new Configuracion({rutas: {[tipo]: ruta}});
            await config.save();
        }

        return {success: true, message: 'Ruta Actualizada'};
    }
    catch(error){
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return { success: false, message: error.message}
        }      
        
        return { success: false, message: 'Error al Actualizar la Ruta'}
    }
}