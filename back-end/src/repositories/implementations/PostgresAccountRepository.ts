import { PrismaClient } from "@prisma/client";
import { Account } from "../../entities/Account";
import { IAccountRepository } from "../IAccountRepository";

export class PostgresAccountRepository implements IAccountRepository {
    private connection: PrismaClient

    constructor() {
        this.connection = new PrismaClient();
    }

    async save(account: Account): Promise<void> {
        await this.connection.account.create({
            data: {
                balance: account.balance,
                userId: account.userId,
                id: account.id
            }
        });
    }

    async findByUserId(userId: string): Promise<Account | null> {
        return await this.connection.account.findFirst({
            where: {
                userId: userId
            }
        });
    }

    async findById(accountId: string): Promise<Account | null> {
        return await this.connection.account.findFirst({
            where: {
                id: accountId
            }
        });
    }

    async updateBalance(account: Account): Promise<void> {
        await this.connection.account.update({
            where: {
                userId: account.userId
            },
            data: {
                balance: account.balance
            }
        });
    }


}