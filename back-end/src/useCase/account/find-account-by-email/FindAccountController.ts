import { Request, Response } from "express";
import { FindAccountByEmailUseCase } from "./FindAccountByEmailUseCase";

export class FindAccountController {
    constructor(private findAccountByEmailUseCase: FindAccountByEmailUseCase) { }

    async handle(request: Request, response: Response) {

        const { email } = request.body;

        try {
            const account = await this.findAccountByEmailUseCase.execute({ email });
            return response.json(account);

        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}