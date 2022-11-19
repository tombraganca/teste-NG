import { RefreshToken } from "../entities/RefreshToken";


export interface IGenerateRefreshTokenProvider {
    execute(refresh: RefreshToken): Promise<void>;
}