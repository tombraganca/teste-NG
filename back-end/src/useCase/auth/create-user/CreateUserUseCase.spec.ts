
import { InMemoryUserRepository } from "../../../test/repositories-test/InMemoryUserRepository";
import { User } from "../../../entities/User";
import { it, describe, expect } from "vitest";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { MailTestProvider } from "../../../test/providers-test/MailTestProvider";
import { InMemoryAccountRepository } from "../../../test/repositories-test/InMemoryAccountRepository";

describe("CreateUserUseCase", () => {
    it("should create a user", async () => {

        const user = {
            name: "User Test",
            email: "test@test",
            password: "123456"
        }

        const inMemoryUserRepository = new InMemoryUserRepository();
        const mailTestProvider = new MailTestProvider();
        const inMemoryAccountRepository = new InMemoryAccountRepository();

        const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository, inMemoryAccountRepository, mailTestProvider);

        await createUserUseCase.execute({
            name: user.name,
            email: user.email,
            password: user.password
        });

        const userCreated = await inMemoryUserRepository.findByEmail(user.email);

        expect(userCreated).toBeInstanceOf(User);
    });

    it("should not create a user if email already exists", async () => {

        const user = {
            name: "User Test",
            email: "test@test",
            password: "123456"
        }

        const inMemoryUserRepository = new InMemoryUserRepository();
        const mailTestProvider = new MailTestProvider();
        const inMemoryAccountRepository = new InMemoryAccountRepository();

        const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository, inMemoryAccountRepository, mailTestProvider);

        await createUserUseCase.execute({
            name: user.name,
            email: user.email,
            password: user.password
        });

        await expect(createUserUseCase.execute({
            name: user.name,
            email: user.email,
            password: user.password
        })).rejects.toThrow("User already exists.");

    });

    it("should not create a user if email is invalid", async () => {

        const user = {
            name: "User Test",
            email: "test@test",
            password: "123456"
        }

        const inMemoryUserRepository = new InMemoryUserRepository();
        const mailTestProvider = new MailTestProvider();
        const inMemoryAccountRepository = new InMemoryAccountRepository();

        const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository, inMemoryAccountRepository, mailTestProvider);

        await expect(createUserUseCase.execute({
            name: user.name,
            email: "invalid_email",
            password: user.password
        })).rejects.toThrow("Invalid email.");
    });

    it("expects that when the user is created, he has 100 cash in his account.", async () => {
        const user = {
            name: "User Test",
            email: "test@test",
            password: "123456"
        }

        const inMemoryUserRepository = new InMemoryUserRepository();
        const mailTestProvider = new MailTestProvider();
        const inMemoryAccountRepository = new InMemoryAccountRepository();

        const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository, inMemoryAccountRepository, mailTestProvider);

        await createUserUseCase.execute(user);
        const userCreated = await inMemoryUserRepository.findByEmail(user.email);
        const account = await inMemoryAccountRepository.findByUserId(userCreated.id);

        expect(account?.balance).toBe(100);
    });

});
