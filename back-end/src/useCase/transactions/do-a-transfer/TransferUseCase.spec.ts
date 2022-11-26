import { describe, it, expect } from "vitest";
import { MailTestProvider } from "../../../test/providers-test/MailTestProvider";
import { InMemoryAccountRepository } from "../../../test/repositories-test/InMemoryAccountRepository";
import { InMemoryTransactionRepository } from "../../../test/repositories-test/InMemoryTransactionRepository";
import { InMemoryUserRepository } from "../../../test/repositories-test/InMemoryUserRepository";
import { CreateUserUseCase } from "../../auth/create-user/CreateUserUseCase";
import { FindAccountByEmailUseCase } from "../../account/find-account-by-email/FindAccountByEmailUseCase";
import { FindAccountById } from "../../account/find-account-by-id/FindAccountById";
import { TransferUseCase } from "./TransferUseCase";

describe('TransferUseCase', async () => {

    const inMemoryUserRepository = new InMemoryUserRepository();
    const inMemoryAccountRepository = new InMemoryAccountRepository();
    const inMemoryTransactionRepository = new InMemoryTransactionRepository();
    const emailTesteProvider = new MailTestProvider();
    const createUser = new CreateUserUseCase(inMemoryUserRepository, inMemoryAccountRepository, emailTesteProvider);
    const findAccountByEmailUseCase = new FindAccountByEmailUseCase(inMemoryAccountRepository, inMemoryUserRepository);

    const user = {
        name: "User Name",
        email: "email@email",
        password: "password",
    };

    const user2 = {
        name: "User Name 2",
        email: "email2@email",
        password: "password",
    };

    await createUser.execute(user);
    await createUser.execute(user2);

    const accountCreated = await findAccountByEmailUseCase.execute({ email: user.email });
    const account2Created = await findAccountByEmailUseCase.execute({ email: user2.email });

    const transferUseCase = new TransferUseCase(inMemoryAccountRepository, inMemoryUserRepository, inMemoryTransactionRepository, emailTesteProvider);

    it('should transfer money', async () => {

        const transfer = await transferUseCase.execute({
            amount: 10,
            details: "Details",
            receivedAccountId: accountCreated.id,
            senderAccountId: account2Created.id
        });

        expect(transfer).toHaveProperty(['transaction', 'id']);
    });

    it('should not transfer money if sender account not exists', async () => {

        await expect(transferUseCase.execute({
            amount: 10,
            details: "Details",
            receivedAccountId: accountCreated.id,
            senderAccountId: "invalid_id"
        })).rejects.toThrow("Sender account not found.");

    });

    it('should not transfer money if received account not exists', async () => {

        await expect(transferUseCase.execute({
            amount: 10,
            details: "Details",
            receivedAccountId: "invalid_id",
            senderAccountId: account2Created.id
        })).rejects.toThrow("Received account not found.");

    });

    it('should not transfer money if sender account is the same as received account', async () => {

        await expect(transferUseCase.execute({
            amount: 10,
            details: "Details",
            receivedAccountId: accountCreated.id,
            senderAccountId: accountCreated.id
        })).rejects.toThrow("You can not transfer to yourself.");

    });

    it('should not transfer money if amount is less than 0', async () => {
        await expect(transferUseCase.execute({
            amount: -10,
            details: "Details",
            receivedAccountId: accountCreated.id,
            senderAccountId: account2Created.id
        })).rejects.toThrow("Amount must be greater than 0.");
    });

    it('should subtract the money of sender account', async () => {

        const user3 = {
            name: "User Name 3",
            email: "email3@email",
            password: "password",
        };

        await createUser.execute(user3);

        const account3Created = await findAccountByEmailUseCase.execute({ email: user3.email });

        const transfer = await transferUseCase.execute({
            amount: 10,
            details: "Details",
            receivedAccountId: accountCreated.id,
            senderAccountId: account3Created.id
        });

        const findAccountById = new FindAccountById(inMemoryAccountRepository, inMemoryUserRepository);
        const senderAccount = await findAccountById.execute({ accountId: account3Created.id });

        expect(senderAccount?.account.balance).toBe(90);
    });

    it('should add the money of received account', async () => {

        const user4 = {
            name: "User Name 4",
            email: "email4@email",
            password: "password",
        };

        await createUser.execute(user4);

        const account3Created = await findAccountByEmailUseCase.execute({ email: user4.email });

        const transfer = await transferUseCase.execute({
            amount: 10,
            details: "Details",
            receivedAccountId: account3Created.id,
            senderAccountId: accountCreated.id
        });

        const findAccountById = new FindAccountById(inMemoryAccountRepository, inMemoryUserRepository);
        const receivedAccount = await findAccountById.execute({ accountId: accountCreated.id });

        expect(receivedAccount?.account.balance).toBe(110);
    });
})