import { describe, expect, it } from "vitest";
import { MailTestProvider } from "../../../test/providers-test/MailTestProvider";
import { InMemoryAccountRepository } from "../../../test/repositories-test/InMemoryAccountRepository";
import { InMemoryUserRepository } from "../../../test/repositories-test/InMemoryUserRepository";
import { CreateUserUseCase } from "../../auth/create-user/CreateUserUseCase";
import { FindAccountByEmailUseCase } from "./FindAccountByEmailUseCase";

describe("FindAccountByEmailUseCase", async () => {

    const user = {
        name: "User Name",
        email: "email@email",
        password: "password",
    };

    const inMemoryUserRepository = new InMemoryUserRepository();
    const inMemoryAccountRepository = new InMemoryAccountRepository();
    const emailTesteProvider = new MailTestProvider();

    const createUser = new CreateUserUseCase(inMemoryUserRepository, inMemoryAccountRepository, emailTesteProvider);

    await createUser.execute(user);

    it("should find an account", async () => {


        const findAccount = new FindAccountByEmailUseCase(inMemoryAccountRepository, inMemoryUserRepository);

        const account = await findAccount.execute({ email: user.email });

        expect(account).toBeDefined();
    });

    it("should not find an account if user not exists", async () => {

        const findAccount = new FindAccountByEmailUseCase(inMemoryAccountRepository, inMemoryUserRepository);

        try {
            await findAccount.execute({ email: "email2" });
        } catch (err: any) {
            expect(err.message).toBe("User not found.");
        }

    });

    it("should not find an account if account not exists", async () => {

        const findAccount = new FindAccountByEmailUseCase(inMemoryAccountRepository, inMemoryUserRepository);

        try {
            await findAccount.execute({ email: user.email });
        }
        catch (error: any) {
            expect(error.message).toBe("Account not found.");
        }

    });

    it('should return account and user if email is equal to authUser', async () => {

        const findAccount = new FindAccountByEmailUseCase(inMemoryAccountRepository, inMemoryUserRepository);

        const userCreated = await inMemoryUserRepository.findByEmail(user.email);

        const account = await findAccount.execute({ email: user.email, authUserId: userCreated.id });

        expect(account).toHaveProperty('balance');
    });

    it('should return account and user if email is not equal to authUser', async () => {

        const findAccount = new FindAccountByEmailUseCase(inMemoryAccountRepository, inMemoryUserRepository);

        const account = await findAccount.execute({ email: user.email, authUserId: "email2" });

        expect(account).not.toHaveProperty('account.balance');
    });
});
