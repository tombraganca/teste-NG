import { Transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../../repositories/ITransactionRepository";

export class InMemoryTransactionRepository implements ITransactionRepository {
    public transactions: Transaction[] = [];

    async save(transaction: Transaction): Promise<void> {
        this.transactions.push(transaction);
    }

    async listByAccountId(accountId: string): Promise<Transaction[]> {
        return this.transactions.filter((transaction) => transaction.receivedAccountId === accountId || transaction.senderAccountId === accountId);
    }
}