import { RefreshToken } from "../entities/RefreshToken";

export interface IRefreshTokenRepository {
    findByRefreshToken(refreshToken: string): Promise<RefreshToken | null>;
    save(refreshToken: RefreshToken): Promise<void>;
    deleteManyByUserId(userId: string): Promise<void>;
}