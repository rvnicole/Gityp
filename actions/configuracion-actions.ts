"use server";

import { Configuracion, IConfiguracion } from "@/model/Configuracion";

export async function getConfig(){
    try{
        const config = await Configuracion.find<IConfiguracion>();
        if( config.length > 0 ){
            return {
                folioInicial: config[0].folioInicial,
                plantillas: config[0].plantillas
            };
        }
        else{
            const config = new Configuracion({ folioInicial: "1" });
            return {
                folioInicial: config.folioInicial,
                plantillas: []
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
        const { folio } = formData;
        const config = await Configuracion.find();
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