import { Transaction } from "../entities/Transaction";

export interface ITransactionRepository {
    save(transfer: Transaction): Promise<void>;
    listByAccountId(accountId: string): Promise<Transaction[]>;
}