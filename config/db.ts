import mongoose from "mongoose";
import { exit } from "process";

export const connectDB = async () => {
    if(mongoose.connections[0].readyState){
        const connection = mongoose.connections[0];
        console.log(`Conexión ya establecida. Conectado a: ${connection.host} port: ${connection.port}`);
        return;
    }
    try{
        console.log(process.env.DATABASE_URL, 'URL DE LA BD');
        const { connection } = await mongoose.connect(process.env.DATABASE_URL!);
        const urlConnection = `Conectado a: ${connection.host} port: ${connection.port}`;
        console.log(urlConnection);
    }
    catch(error){
        console.log(error);
        exit(1);
    };
};