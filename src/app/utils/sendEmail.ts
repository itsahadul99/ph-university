import nodemailer from 'nodemailer'
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "itisahadul@gmail.com",
            pass: config.nodemailer_pass,
        },
    });
  await transporter.sendMail({
        from: 'itisahadul@gmail.com',
        to,
        subject: "resset the password via link within ten mins !!",
        text: "", // plain‑text body
        html, // HTML body
    });
}