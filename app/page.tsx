import { Configuracion } from "@/model/Configuracion";
import ModalAdd from "@/src/components/ui/ModalAdd";

async function initConfiguracion(){
  try{
      const config = await Configuracion.find();
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

export default async function Home() {
  await initConfiguracion();
  return (
    <>
    </>
  );
}
