
import { MailTrapMailProvider } from "../../../providers/implementations/MailTrapMailProvider";
import { PostgresAccountRepository } from "../../../repositories/implementations/PostgresAccountRepository";
import { PostgresUsersRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailTrapMailProvider = new MailTrapMailProvider();
const postgresUsersProvider = new PostgresUsersRepository();
const accountRepository = new PostgresAccountRepository();

const createUserUseCase = new CreateUserUseCase(
    postgresUsersProvider,
    accountRepository,
    mailTrapMailProvider
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserUseCase, createUserController };