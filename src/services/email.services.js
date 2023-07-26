import { createTransport } from 'nodemailer';
import 'dotenv/config';
import config from '../config.js';

export const transporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD
    }
});