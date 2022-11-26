import { Request, Response } from "express";
import { ListTransferByAccountIdUseCase } from './ListTransferByAccountIdUseCase';

export class ListTransferByIdController {

    constructor(
        private listTransferByAccountIdUseCase: ListTransferByAccountIdUseCase
    ) { }


    async handle(request: Request, response: Response) {

        const { accountId } = request.params;

        const transfers = await this.listTransferByAccountIdUseCase.execute({ accountId });

        return response.status(200).json(transfers);

    }
}