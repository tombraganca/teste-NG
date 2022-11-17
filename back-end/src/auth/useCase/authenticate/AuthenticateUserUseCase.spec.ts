import { describe, expect, it } from "vitest";
import { MailTestProvider } from "../../test/providers-test/MailTestProvider";
import { TokenTestProvider } from "../../test/providers-test/TokenTestProvider";
import { InMemoryUserRepository } from "../../test/repositories-test/InMemoryUserRepository";
import { CreateUserUseCase } from "../create-user/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("AuthenticateUserUseCase", () => {
    it("should be able to authenticate an user", async () => {
        const user = {
            name: "User Test",
            email: "test@test",
            password: "1234",
        };

        const createUserRepository = new InMemoryUserRepository();
        const mailProvider = new MailTestProvider();
        const tokenProvider = new TokenTestProvider();
        const createUserUseCase = new CreateUserUseCase(createUserRepository, mailProvider);
        await createUserUseCase.execute(user);

        const authenticateUserUseCase = new AuthenticateUserUseCase(createUserRepository, tokenProvider);

        const result = await authenticateUserUseCase.execute({
            email: "test@test",
            password: "1234",
        });

        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("email");
        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () => {
        const user = {
            name: "User Test",
            email: "test@test",
            password: "1234",
        };

        const createUserRepository = new InMemoryUserRepository();
        const mailProvider = new MailTestProvider();
        const tokenProvider = new TokenTestProvider();
        const createUserUseCase = new CreateUserUseCase(createUserRepository, mailProvider);
        await createUserUseCase.execute(user);

        const authenticateUserUseCase = new AuthenticateUserUseCase(createUserRepository, tokenProvider);

        await expect(
            authenticateUserUseCase.execute({
                email: "wrong_email@test",
                password: user.password,
            })
        ).rejects.toThrowError("Email or password incorrect.");
    });

    it("should not be able to authenticate with incorrect password", async () => {
        const user = {
            name: "User Test",
            email: "test@test",
            password: "1234",
        };

        const createUserRepository = new InMemoryUserRepository();
        const mailProvider = new MailTestProvider();
        const tokenProvider = new TokenTestProvider();
        const createUserUseCase = new CreateUserUseCase(createUserRepository, mailProvider);
        await createUserUseCase.execute(user);

        const authenticateUserUseCase = new AuthenticateUserUseCase(createUserRepository, tokenProvider);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "wrong_password",
            })
        ).rejects.toThrowError("Email or password incorrect.");
    });
})