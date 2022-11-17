
import { config } from '../../config/config';
import { ITokenPayload, ITokenProvider } from '../ITokenProvider';
import jwt from 'jsonwebtoken';

export class JWTProvider implements ITokenProvider {

    private secret: string;

    constructor() {
        this.secret = config.JWT_SECRET;
    }

    async generateToken(payload: ITokenPayload): Promise<string> {
        const token = jwt.sign(payload, this.secret, {
            expiresIn: 86400
        });

        return token;
    }

    // async verifyToken(token: string): Promise<ITokenPayload> {
    //     const { sub, email } = verify(token, this.secret) as ITokenPayload;

    //     const payload = {
    //         sub,
    //         email
    //     };

    //     return payload;
    // }

}