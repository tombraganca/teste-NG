import { MailTrapMailProvider } from "../../../providers/implementations/MailTrapMailProvider";
import { PostgresAccountRepository } from "../../../repositories/implementations/PostgresAccountRepository";
import { PostgresTransactionRepository } from "../../../repositories/implementations/PostgresTransactionRepository";
import { PostgresUsersRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { TransferController } from "./TransferController";
import { TransferUseCase } from "./TransferUseCase";


const transactionRepository = new PostgresTransactionRepository();
const accountRepository = new PostgresAccountRepository();
const userRepository = new PostgresUsersRepository();
const mailProvider = new MailTrapMailProvider()
const transferUseCase = new TransferUseCase(accountRepository, userRepository, transactionRepository, mailProvider);
const transferController = new TransferController(transferUseCase);

export { transferController, transferUseCase };