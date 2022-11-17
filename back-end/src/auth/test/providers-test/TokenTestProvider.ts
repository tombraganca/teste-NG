import { ITokenPayload, ITokenProvider } from "../../../providers/ITokenProvider";

export class TokenTestProvider implements ITokenProvider {
    async generateToken(payload: ITokenPayload): Promise<string> {
        const token = `token test ${payload.id}`;
        return token;
    }
}