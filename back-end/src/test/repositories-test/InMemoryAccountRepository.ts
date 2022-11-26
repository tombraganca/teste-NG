import { Account } from "../../entities/Account";
import { IAccountRepository } from "../../repositories/IAccountRepository";

export class InMemoryAccountRepository implements IAccountRepository {
    private accounts: Account[] = [];

    async save(account: Account): Promise<void> {

        const accountAlreadyExists = this.accounts.find(_account => _account.userId === account.userId);

        if (accountAlreadyExists) {
            throw new Error('Account already exists.');
        }

        this.accounts.push(account);
    }

    async findByUserId(userId: string): Promise<Account | null> {
        console.log(this.accounts);
        const account = this.accounts.find(account => account.userId === userId);

        return account || null;
    }

    async findById(accountId: string): Promise<Account | null> {
        const account = this.accounts.find(account => account.id === accountId);

        return account || null;
    }

    async updateBalance(account: Account): Promise<void> {
        const accountIndex = this.accounts.findIndex(_account => _account.userId === account.userId);

        this.accounts[accountIndex] = account;
    }


}
