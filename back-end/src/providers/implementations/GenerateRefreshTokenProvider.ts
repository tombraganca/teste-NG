import { IGenerateRefreshTokenProvider } from "../IGenerateRefreshTokenProvider";
import dayjs from "dayjs";
import { RefreshToken } from "../../entities/RefreshToken";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";
import { config } from "../../config/config";
import { PrismaClient } from "@prisma/client";

export class GenerateRefreshTokenProvider implements IGenerateRefreshTokenProvider {

    public connection = new PrismaClient();
    constructor() { }

    async execute(refreshToken: RefreshToken): Promise<void> {

        if (!refreshToken.expiresIn) {
            refreshToken.expiresIn = dayjs().add(Number(config.REFRESH_TOKEN), 'second').unix();
        }

        await this.connection.refreshToken.create({
            data: {
                userId: refreshToken.userId,
                expiresIn: refreshToken.expiresIn,
                id: refreshToken.id
            }
        });
    }

}
