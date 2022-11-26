import { IAccountRepository } from "../../../repositories/IAccountRepository";
import { IFindAccountByIdDTO } from "./IFindAccountByIdDTO";

export class FindAccountById {
    constructor(private accountRepository: IAccountRepository) {

    }

    execute({ accountId }: IFindAccountByIdDTO) {
        const account = this.accountRepository.findById(accountId);

        return account;
    }
}