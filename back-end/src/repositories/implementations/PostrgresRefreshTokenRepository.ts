import { PrismaClient } from "@prisma/client";
import { RefreshToken } from "../../entities/RefreshToken";
import { IRefreshTokenRepository } from "../IRefreshTokenRepository";

export class PostgresRefreshTokenRepository implements IRefreshTokenRepository {
    private connection: PrismaClient

    constructor() {
        this.connection = new PrismaClient();
    }

    async save(refreshToken: RefreshToken): Promise<void> {
        await this.connection.refreshToken.create({
            data: {
                userId: refreshToken.userId,
                expiresIn: refreshToken.expiresIn,
                id: refreshToken.id
            }
        });
    }

    async findByRefreshToken(refreshToken: string): Promise<RefreshToken | null> {
        const refreshTokenData = await this.connection.refreshToken.findFirst({
            where: {
                id: refreshToken
            }
        });

        if (!refreshTokenData) {
            return null;
        }

        return new RefreshToken(refreshTokenData, refreshTokenData.id);
    }

    async deleteManyByUserId(userId: string): Promise<void> {
        await this.connection.refreshToken.deleteMany({
            where: {
                userId
            }
        });
    }
}