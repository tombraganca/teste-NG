import { IAccountRepository } from "../../../repositories/IAccountRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IFindAccountByEmailDTO } from "./FindAccountByEmailDTO";

export class FindAccountByEmailUseCase {

    constructor(
        private accountRepository: IAccountRepository,
        private usersRepository: IUserRepository
    ) { }

    async execute({ email }: IFindAccountByEmailDTO) {

        if (!email) {
            throw new Error('Email not provided.');
        }

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error('User not found.');
        }

        const account = await this.accountRepository.findByUserId(user.id);

        if (!account) {
            throw new Error('Account not found.');
        }

        return { userId: account.userId, id: account.id, createdAt: account.createdAt, user };
    }
}