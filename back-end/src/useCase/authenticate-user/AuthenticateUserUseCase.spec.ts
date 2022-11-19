import { describe, expect, it } from "vitest";
import { GenerateRefreshTokenTestProvider } from "../../test/providers-test/GenerateRefreshTokenTestProvider";
import { MailTestProvider } from "../../test/providers-test/MailTestProvider";
import { TokenTestProvider } from "../../test/providers-test/TokenTestProvider";
import { InMemoryRefreshTokenRepository } from "../../test/repositories-test/InMemoryRefreshTokenRepository";
import { InMemoryUserRepository } from "../../test/repositories-test/InMemoryUserRepository";
import { CreateUserUseCase } from "../create-user/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("AuthenticateUserUseCase", () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();
    const mailProvider = new MailTestProvider();
    const tokenProvider = new TokenTestProvider();
    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository, mailProvider);
    const generateRefreshTokenProvider = new GenerateRefreshTokenTestProvider()

    const user = {
        name: "User Test",
        email: "test@test",
        password: "1234",
    };

    it("should be able to authenticate an user", async () => {

        await createUserUseCase.execute(user);
        const authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUserRepository, inMemoryRefreshTokenRepository, generateRefreshTokenProvider, tokenProvider);

        const result = await authenticateUserUseCase.execute({
            email: "test@test",
            password: "1234",
        });

        expect(result).toHaveProperty("user.id");
        expect(result).toHaveProperty("user.name");
        expect(result).toHaveProperty("user.email");
        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () => {

        const createUserRepository = new InMemoryUserRepository();
        const mailProvider = new MailTestProvider();
        const tokenProvider = new TokenTestProvider();
        const createUserUseCase = new CreateUserUseCase(createUserRepository, mailProvider);
        const generateRefreshTokenProvider = new GenerateRefreshTokenTestProvider()
        await createUserUseCase.execute(user);

        const authenticateUserUseCase = new AuthenticateUserUseCase(createUserRepository, inMemoryRefreshTokenRepository, generateRefreshTokenProvider, tokenProvider);

        await expect(
            authenticateUserUseCase.execute({
                email: "wrong_email@test",
                password: user.password,
            })
        ).rejects.toThrowError("Email or password incorrect.");
    });

    it("should not be able to authenticate with incorrect password", async () => {

        const createUserRepository = new InMemoryUserRepository();
        const mailProvider = new MailTestProvider();
        const tokenProvider = new TokenTestProvider();
        const createUserUseCase = new CreateUserUseCase(createUserRepository, mailProvider);
        const generateRefreshTokenProvider = new GenerateRefreshTokenTestProvider()
        await createUserUseCase.execute(user);

        const authenticateUserUseCase = new AuthenticateUserUseCase(createUserRepository, inMemoryRefreshTokenRepository, generateRefreshTokenProvider, tokenProvider);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "wrong_password",
            })
        ).rejects.toThrowError("Email or password incorrect.");
    });
})