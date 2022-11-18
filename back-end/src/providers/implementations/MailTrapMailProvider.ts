import { IMailProvider, IMessage } from "../IMailProvider";
import { config } from '../../config/config';
import nodemailer from 'nodemailer';

interface ISMTPTransport {
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    }
}
export class MailTrapMailProvider implements IMailProvider {
    private transporter;

    constructor() {

        const configTransporter: ISMTPTransport = {
            host: config.MAIL_HOST,
            port: Number(config.MAIL_PORT),
            auth: {
                user: config.MAIL_USER,
                pass: config.MAIL_PASS
            }
        }

        this.transporter = nodemailer.createTransport(configTransporter);
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