import { IAccountRepository } from "../../../repositories/IAccountRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IFindAccountByIdDTO } from "./IFindAccountByIdDTO";

export class FindAccountById {
    constructor(private accountRepository: IAccountRepository, private userRepository: IUserRepository) {

    }

    async execute({ accountId }: IFindAccountByIdDTO) {
        const account = await this.accountRepository.findById(accountId);

        if (!account) {
            throw new Error('Account not found.');
        }

        const user = await this.userRepository.findByUserId(account.userId);

        return { account: { id: account.id, userId: account.userId, balance: account.balance }, user };
    }
}