
export async function getFacturaById(){
    try{

    }
    catch(error){
        console.log(error);
        return {
            succces: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al obtener la factura'
        }
    }
}