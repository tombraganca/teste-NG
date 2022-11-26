import { PostgresAccountRepository } from "../../../repositories/implementations/PostgresAccountRepository";
import { PostgresUsersRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { FindAccountByEmailUseCase } from "./FindAccountByEmailUseCase";
import { FindAccountController } from "./FindAccountController";

const usersRepository = new PostgresUsersRepository();
const accountRepository = new PostgresAccountRepository();
const findAccountByEmailUseCase = new FindAccountByEmailUseCase(accountRepository, usersRepository);
const findAccountController = new FindAccountController(findAccountByEmailUseCase);

export { findAccountController, findAccountByEmailUseCase };