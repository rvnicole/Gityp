"use server";
import { Email } from "@/src/types";
import nodemailer from "nodemailer";

export async function sendEmail( dataSend: Email, htmlString: string ){
    try{
        const respuesta = await fetch("https://transform-to-string.onrender.com/transform", {
            method: "POST",
            body: JSON.stringify({ htmlString }),
            headers: {
                "content-type": "application/json; charset=utf-8"
            }
        });
        console.log("Respuesta", respuesta);
        const resultado = await respuesta.json();          
        console.log("Resultado", resultado);       
        const data = resultado.data;
        console.log("Data", data);   
        const pdf = Buffer.from(data, "base64");
        console.log("PDF", pdf);   
    
        const { para, cc, cco, asunto, mensaje } = dataSend;

        const transportador = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.USER_EMAIL_GITYP,
                pass: process.env.PASS_EMAIL_GITYP
            }
        })

        await transportador.sendMail({
            from: `<${process.env.USER_EMAIL_GITYP}>`,
            to: para.split(','),
            cc: cc?.split(','),
            bcc: cco?.split(','),
            subject: asunto,
            text: mensaje,
            attachments: [{
                filename: 'Presupuesto.pdf',
                content: pdf,
                contentType: 'application/pdf'
            }]
            //html:
        });

        return {
            success: true,
            message: 'Correo enviado'
        }
    }
    catch( error ){
        console.log(error);
        return {
            success: false,
            message: typeof error === 'object' && error !== null && 'message' in error ? error.message : 'Error al enviar el correo electrónico'
        }
    }
}