
import { config } from '../../config/config';
import { ITokenPayload, IGenerateTokenProvider } from '../IGenerateTokenProvider';
import jwt from 'jsonwebtoken';

export class GenerateTokenProvider implements IGenerateTokenProvider {

    private secret: string;

    constructor() {
        this.secret = config.SECRET_KEY;
    }

    async generateToken(payload: ITokenPayload): Promise<string> {
        const token = jwt.sign(payload, this.secret, {
            expiresIn: '1d'
        });

        return token;
    }

}