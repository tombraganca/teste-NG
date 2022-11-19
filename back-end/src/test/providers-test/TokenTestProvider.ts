import { ITokenPayload, IGenerateTokenProvider } from "../../providers/IGenerateTokenProvider";

export class TokenTestProvider implements IGenerateTokenProvider {
    async generateToken(payload: ITokenPayload): Promise<string> {
        const token = `token test ${payload.id}`;
        return token;
    }
}