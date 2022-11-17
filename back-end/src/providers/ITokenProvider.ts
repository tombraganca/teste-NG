export interface ITokenPayload {
    id: string;
}

export interface ITokenProvider {
    generateToken(payload: ITokenPayload): Promise<string>;
    //verifyToken(token: string): Promise<ITokenPayload>;
}