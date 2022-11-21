import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
    constructor(private authenticateUserUseCase: AuthenticateUserUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        console.log('email', email);
        console.log('password', password);

        try {
            const userAuth = await this.authenticateUserUseCase.execute({ email, password });

            return response.json({ ...userAuth });
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}