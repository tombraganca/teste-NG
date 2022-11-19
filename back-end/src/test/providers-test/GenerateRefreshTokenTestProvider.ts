import { RefreshToken } from "../../entities/RefreshToken";
import { IGenerateRefreshTokenProvider } from "../../providers/IGenerateRefreshTokenProvider";

export class GenerateRefreshTokenTestProvider implements IGenerateRefreshTokenProvider {
    async execute(refreshToken: RefreshToken): Promise<void> {
        return;
    }


}