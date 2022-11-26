import { Request, Response } from "express";
import { TransferUseCase } from "./TransferUseCase";

export class TransferController {
    constructor(
        private transferUseCase: TransferUseCase,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { receivedAccountId, amount, details } = request.body;
        const senderAccountId = request.headers.accountId as string;

        try {
            await this.transferUseCase.execute({
                receivedAccountId,
                amount,
                details,
                senderAccountId,
            });

            return response.status(201).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}