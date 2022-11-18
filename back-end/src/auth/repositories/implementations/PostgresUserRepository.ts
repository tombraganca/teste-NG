import { prisma, PrismaClient } from "@prisma/client";
import { User } from "../../../entities/User";
import { IUserRepository } from "../IUserReposotory";

export class PostgresUsersProvider implements IUserRepository {
    private connection: PrismaClient;

    constructor() {
        this.connection = new PrismaClient({
            log: ['info']
        });
    }


    async findByEmail(email: string): Promise<User | any> {
        return await this.connection.user.findFirst({
            where: {
                email
            }
        });
    }

    async save(user: User): Promise<void> {

        await this.connection.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                id: user.id,
                createdAt: user.createdAt,
            }
        });
    }

}