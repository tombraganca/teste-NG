import { IMailProvider, IMessage } from "../IMailProvider";
import { config } from '../../config/config';
import nodemailer from 'nodemailer';

export class MailTrapMailProvider implements IMailProvider {
    private transporter;

    constructor() {

        this.transporter = nodemailer.createTransport({
            host: config.MAIL_HOST,
            port: config.MAIL_PORT,
            auth: {
                user: config.MAIL_USER,
                pass: config.MAIL_PASS
            }
        });
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            from: {
                name: message.from.name,
                address: message.from.email
            },
            to: {
                name: message.to.name,
                address: message.to.email
            },
            subject: message.subject,
            html: message.body
        });
    }
} 