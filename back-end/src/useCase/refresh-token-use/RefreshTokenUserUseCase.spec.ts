import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import { GenerateRefreshTokenProvider } from "../../providers/implementations/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../providers/implementations/GenerateTokenProvider";
import { InMemoryRefreshTokenRepository } from "../../test/repositories-test/InMemoryRefreshTokenRepository";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

describe("RefreshTokenUserUseCase", () => {

    const refreshTokenRepository = new InMemoryRefreshTokenRepository();
    refreshTokenRepository.save({
        id: "refreshToken",
        userId: "userId",
        expiresIn: dayjs().add(1, 'day').unix(),
    });
    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
    const generateTokenProvider = new GenerateTokenProvider();

    const refreshTokenUserUseCase = new RefreshTokenUserUseCase(refreshTokenRepository, generateTokenProvider, generateRefreshTokenProvider);

    it("should be able to refresh token", async () => {
        await expect(refreshTokenUserUseCase.execute({ refreshToken: "refreshToken" })).resolves.toHaveProperty("token");
    });

    it("should not be able to refresh token if refresh token does not exists", async () => {
        await expect(refreshTokenUserUseCase.execute({ refreshToken: "refresh token does not exists" })).rejects.toThrow("Invalid refresh token");
    });
});

