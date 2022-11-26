import { Transaction } from './../../../entities/Transaction';
import { IAccountRepository } from "../../../repositories/IAccountRepository";
import { ITransactionRepository } from "../../../repositories/ITransactionRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { FindAccountById } from "../../account/find-account-by-id/FindAccountById";
import { IListTransferByAccountIdDTO } from "./IListTransferByAccountIdDTO";

interface ITransaction {
    id: string;
    amount: number;
    details: string;
    createdAt: Date;
    senderAccount: {
        accountId: string;
        userId: string;
        user: {
            name: string;
            email: string;
        }
    };
    receivedAccount: {
        accountId: string;
        userId: string;
        user: {
            name: string;
            email: string;
        }
        type: ('sent' | 'received');
    }
};

export class ListTransferByAccountIdUseCase {
    constructor(
        private transferRepository: ITransactionRepository,
        private accountRepository: IAccountRepository,
        private userRepository: IUserRepository
    ) { }

    async execute({ accountId }: IListTransferByAccountIdDTO): Promise<ITransaction[]> {

        const transfers: any = await this.transferRepository.listByAccountId(accountId);

        const findAccountById = new FindAccountById(this.accountRepository, this.userRepository);

        for await (const transfer of transfers) {
            const receivedAccount = await findAccountById.execute({ accountId: transfer.receivedAccountId });
            const senderAccount = await findAccountById.execute({ accountId: transfer.senderAccountId });
            delete transfer.receivedAccountId;
            delete transfer.senderAccountId;
            transfer.receivedAccount = {
                name: receivedAccount?.user?.name,
                email: receivedAccount?.user?.email,
                userId: receivedAccount?.account.userId,
                accountId: receivedAccount?.account.id,
            };
            transfer.senderAccount = {
                name: senderAccount?.user?.name,
                email: senderAccount?.user?.email,
                userId: senderAccount?.account.userId,
                accountId: senderAccount?.account.id,
            };
            if (accountId === transfer.senderAccount.accountId) {
                transfer.type = 'sent';
            } else {
                transfer.type = 'received';
            }
        }

        return transfers;
    }
}
