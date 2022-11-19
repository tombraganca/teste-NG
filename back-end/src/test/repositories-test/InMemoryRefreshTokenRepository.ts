import { RefreshToken } from "../../entities/RefreshToken";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";

export class InMemoryRefreshTokenRepository implements IRefreshTokenRepository {
    private refreshToken: RefreshToken[] = [];

    async findByRefreshToken(refreshToken: string): Promise<RefreshToken | null> {
        const refreshTokenExists = this.refreshToken.find(_refreshToken => _refreshToken.id === refreshToken);

        return refreshTokenExists || null;
    }

    async save(refreshToken: RefreshToken): Promise<void> {
        this.refreshToken.push(refreshToken);
    }

    async deleteManyByUserId(userId: string): Promise<void> {
        this.refreshToken = this.refreshToken.filter(_refreshToken => _refreshToken.userId !== userId);
    }
}