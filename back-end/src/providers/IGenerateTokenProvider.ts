export interface ITokenPayload {
    id: string;
}

export interface IGenerateTokenProvider {
    generateToken(payload: ITokenPayload): Promise<string>;
    //verifyToken(token: string): Promise<ITokenPayload>;
}