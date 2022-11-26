import { describe, it, expect } from "vitest";
import { CreateUserUseCase } from './../../auth/create-user/CreateUserUseCase';
import { InMemoryUserRepository } from './../../../test/repositories-test/InMemoryUserRepository';
import { InMemoryAccountRepository } from './../../../test/repositories-test/InMemoryAccountRepository';
import { InMemoryTransactionRepository } from "../../../test/repositories-test/InMemoryTransactionRepository";
import { ListTransferByAccountIdUseCase } from "./ListTransferByAccountIdUseCase";
import { MailTestProvider } from '../../../test/providers-test/MailTestProvider';
import { TransferUseCase } from '../do-a-transfer/TransferUseCase';
import { FindAccountByEmailUseCase } from "../../account/find-account-by-email/FindAccountByEmailUseCase";

describe("ListTransferByAccountId", async () => {

    const inMemoryTransactionRepository = new InMemoryTransactionRepository();
    const inMemoryAccountRepository = new InMemoryAccountRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    const mailTest = new MailTestProvider();

    const listTransferByAccountIdUseCase = new ListTransferByAccountIdUseCase(inMemoryTransactionRepository, inMemoryAccountRepository, inMemoryUserRepository);

    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository, inMemoryAccountRepository, mailTest);
    const transferUseCase = new TransferUseCase(inMemoryAccountRepository, inMemoryUserRepository, inMemoryTransactionRepository, mailTest);

    const user = {
        id: "user_id",
        name: "User Name",
        email: "email@email",
        password: "password",
    };

    const user2 = {
        id: "user2_id",
        name: "User Name 2",
        email: "email2@email",
        password: "password",
    };

    await createUserUseCase.execute(user);
    await createUserUseCase.execute(user2);

    it("should show a empty list", async () => {
        const transfers = await listTransferByAccountIdUseCase.execute({ accountId: "id" });
        expect(transfers).toHaveLength(0);
    });

    it("should list transfers by account id", async () => {
        const findAccountByEmailUseCase = new FindAccountByEmailUseCase(inMemoryAccountRepository, inMemoryUserRepository);
        const receivedAccount = await findAccountByEmailUseCase.execute({ email: user.email });
        const senderAccount = await findAccountByEmailUseCase.execute({ email: user2.email });

        await transferUseCase.execute({
            amount: 10,
            details: "Details",
            receivedAccountId: receivedAccount.id,
            senderAccountId: senderAccount.id
        });

        const transfers = await listTransferByAccountIdUseCase.execute({ accountId: receivedAccount.id });

        console.log(transfers);
        expect(transfers).toHaveLength(1);
    });
});