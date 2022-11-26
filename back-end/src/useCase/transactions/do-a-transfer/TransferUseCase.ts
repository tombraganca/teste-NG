import { Transaction } from "../../../entities/Transaction";
import { IAccountRepository } from "../../../repositories/IAccountRepository";
import { ITransferDTO } from "./TransferDTO";
import { ITransactionRepository } from "../../../repositories/ITransactionRepository";
import { IMailProvider } from "../../../providers/IMailProvider";
import { TEMPLATE_EMAIL_TRANSACTION } from "../../../providers/configs/TempleteEmail";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { Account } from "../../../entities/Account";

export class TransferUseCase {

    private receivedUpdated: boolean = false;
    private senderUpdated: boolean = false;
    private attempt: number = 0;

    constructor(
        private accountRepository: IAccountRepository,
        private userRepository: IUserRepository,
        private transactionRepository: ITransactionRepository,
        private mailProvider: IMailProvider,
    ) { }

    public async execute(data: ITransferDTO) {

        const { senderAccountId, receivedAccountId, amount, details } = data;

        if (!senderAccountId) {
            throw new Error('Sender account id not provided.');
        }

        if (!receivedAccountId) {
            throw new Error('Received account id not provided.');
        }

        if (receivedAccountId === senderAccountId) {
            throw new Error('You can not transfer to yourself.');
        }

        if (!amount) {
            throw new Error('Amount not provided.');
        }

        if (amount <= 0) {
            throw new Error('Amount must be greater than 0.');
        }

        const senderAccount = await this.accountRepository.findById(senderAccountId);

        if (!senderAccount) {
            throw new Error('Sender account not found.');
        }

        const receivedAccount = await this.accountRepository.findById(receivedAccountId);

        if (!receivedAccount) {
            throw new Error('Received account not found.');
        }

        if (senderAccount.balance < amount) {
            throw new Error('Insufficient funds.');
        }

        const transaction = new Transaction({
            amount,
            details,
            receivedAccountId,
            senderAccountId
        });

        await this.updateAmounts(senderAccount, receivedAccount, amount);
        await this.transactionRepository.save(transaction);

        await this.sendEmailTransaction(senderAccount, receivedAccount, transaction);

        return { transaction, message: 'Transfer successfully completed' };
    }

    async updateAmounts(sender: Account, received: Account, amount: number) {
        try {

            sender.balance -= amount;
            received.balance += amount;

            await this.accountRepository.updateBalance(sender);
            this.receivedUpdated = true;
            await this.accountRepository.updateBalance(received);
            this.senderUpdated = true;

        } catch (error) {

            if (this.attempt < 3) {
                this.attempt++;
                this.updateAmounts(sender, received, amount);
                return;
            }

            if (this.receivedUpdated) {
                received.balance -= amount;
                await this.accountRepository.updateBalance(received);
            }

            if (this.senderUpdated) {
                sender.balance += amount;
                await this.accountRepository.updateBalance(sender);
            }

            const senderUser = await this.userRepository.findByUserId(sender.userId);

            this.mailProvider.sendMail({
                to: {
                    name: senderUser?.name || '',
                    email: senderUser?.email || ''
                },
                from: {
                    name: 'Equipe do meu app',
                    email: 'ngcash@test.com'
                },
                subject: 'Erro ao realizar transferência',
                body: 'Ocorreu um erro ao realizar a transferência, tente novamente mais tarde.'
            });
            throw new Error('Error while updating accounts.');
        }
    }

    async sendEmailTransaction(sender: Account, received: Account, transaction: Transaction) {

        const userSender = await this.userRepository.findByUserId(sender.userId);
        const userReceived = await this.userRepository.findByUserId(received.userId);

        if (!userSender || !userReceived) {
            console.warn('User not found.');
            return;
        }

        await this.mailProvider.sendMail({
            to: {
                name: userSender.name,
                email: userSender.email,
            },
            from: {
                name: 'Equipe do meu app',
                email: 'ngCash@teste.com',
            },
            subject: 'Transferência realizada com sucesso!',
            body: TEMPLATE_EMAIL_TRANSACTION({
                userReceived,
                userSender,
                amount: transaction.amount,
                details: transaction.details,
            })
        });
    }
}