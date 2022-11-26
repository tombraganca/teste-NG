import { PostgresUsersRepository } from './../../../repositories/implementations/PostgresUserRepository';
import { PostgresTransactionRepository } from './../../../repositories/implementations/PostgresTransactionRepository';
import { ListTransferByAccountIdUseCase } from './ListTransferByAccountIdUseCase';
import { ListTransferByIdController } from "./ListTransferByAccountIdController.ts";
import { PostgresAccountRepository } from '../../../repositories/implementations/PostgresAccountRepository';

const transactionRepository = new PostgresTransactionRepository()
const accountRepository = new PostgresAccountRepository()
const userRepository = new PostgresUsersRepository()

const listTransferByAccountIdUseCase = new ListTransferByAccountIdUseCase(
    transactionRepository,
    accountRepository,
    userRepository
);

const listTransferController = new ListTransferByIdController(listTransferByAccountIdUseCase);

export { listTransferController, listTransferByAccountIdUseCase };