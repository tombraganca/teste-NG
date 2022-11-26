import { PrismaClient } from "@prisma/client";
import { Transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../ITransactionRepository";

export class PostgresTransactionRepository implements ITransactionRepository {

    private connection: PrismaClient;

    constructor() {
        this.connection = new PrismaClient();
    }

    async save(transaction: Transaction): Promise<void> {
        await this.connection.transaction.create({
            data: {
                id: transaction.id,
                amount: transaction.amount,
                details: transaction.details,
                receivedAccountId: transaction.receivedAccountId,
                senderAccountId: transaction.senderAccountId,
                createdAt: transaction.createdAt,
            }
        });
    }
}