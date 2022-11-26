import { Account } from "../entities/Account";

export interface IAccountRepository {
    save(account: Account): Promise<void>;
    findById(accountId: string): Promise<Account | null>;
    findByUserId(userId: string): Promise<Account | null>;
    updateBalance(account: Account): Promise<void>;
}