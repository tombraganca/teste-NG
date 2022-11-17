import { IMailProvider, IMessage } from "../../../providers/IMailProvider";

export class MailTestProvider implements IMailProvider {
    async sendMail(message: IMessage): Promise<void> {
        console.log(`Email sent to ${message.to.email}.`);
    }
}