import { transporter } from "../services/email.services.js";
import 'dotenv/config';
import config from "../config.js";
import {logger} from '../utils/logger.js'


export const sendGmail = async (emailOptions, ticketData) => {
  try {
    const { name } = emailOptions
    const { code, purchase_datetime, amount, purchaser } = ticketData;
    const gmailOptions = {
      from: config.EMAIL,
      to: config.EMAIL,
      subject: 'Detalle de compra',
      html: `<h1>Gracias por tu compra ${name}!</h1>
            <p>Detalles del ticket:</p>
            <ul>
              <li>Código: ${code}</li>
              <li>Fecha de compra: ${purchase_datetime}</li>
              <li>Monto total: $${amount}</li>
              <li>Comprador: ${purchaser}</li>
            </ul>
          `
    }
    const response = await transporter.sendMail(gmailOptions);
    console.log('Email enviado!');
    return response;
  } catch (error) {
    logger.error(error.message)
    throw error;
  }
};

// 

export const sendPasswordResetEmail = async (recipientEmail, resetToken) => {
  try {
    const resetLink = `http://localhost:8080/views/resetpass/${resetToken}`;

    const mailOptions = {
      from: config.EMAIL,
      to: recipientEmail,
      subject: 'Restablecimiento de Contraseña',
      html: `
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background-color:#007bff;color:#fff;text-decoration:none;border-radius:5px;">Restablecer Contraseña</a>
      `
    };

    const response = await transporter.sendMail(mailOptions);
    console.log('Email enviado!');
    return response;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

