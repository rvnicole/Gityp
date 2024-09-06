"use server";
import { Email } from "@/src/types";
import nodemailer from "nodemailer";
import puppeteer from "puppeteer";

export async function sendEmail( dataSend: Email, htmlString: string ){
    try{

        const navegador = await puppeteer.launch();
        const paginaWeb = await navegador.newPage();
        await paginaWeb.setContent(htmlString, { waitUntil: 'domcontentloaded' });
        const pdf = await paginaWeb.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                bottom: '20mm',
                left: '10mm',
                right: '10mm' 
            }
        }) as Buffer;
        await navegador.close();

        const { para, cc, cco, asunto, mensaje } = dataSend;

        const transportador = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASS_EMAIL
            }
        })

        await transportador.sendMail({
            from: `"Eduardo" <${process.env.USER_EMAIL}>`,
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