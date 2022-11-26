import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

export class RefreshTokenUserController {

    constructor(private refreshTokenUserUseCase: RefreshTokenUserUseCase) { }

    async handle(request: Request, response: Response) {
        const { refreshToken } = request.body;

        try {
            const token = await this.refreshTokenUserUseCase.execute({ refreshToken });
            return response.json(token);

        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}