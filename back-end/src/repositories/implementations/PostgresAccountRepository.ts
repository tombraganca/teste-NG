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
        const account = await this.connection.account.findFirst({
            where: {
                userId: userId
            }
        });

        if (!account) {
            return null;
        }

        return new Account({
            balance: account.balance,
            userId: account.userId
        });
    }

    async findById(accountId: string): Promise<Account | null> {
        const account = await this.connection.account.findFirst({
            where: {
                id: accountId
            }
        });

        if (!account) {
            return null;
        }

        return new Account({
            balance: account.balance,
            userId: account.userId
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