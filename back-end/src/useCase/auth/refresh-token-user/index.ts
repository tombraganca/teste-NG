import { GenerateRefreshTokenProvider } from "../../../providers/implementations/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../../providers/implementations/GenerateTokenProvider";
import { PostgresRefreshTokenRepository } from "../../../repositories/implementations/PostgresRefreshTokenRepository";
import { RefreshTokenUserController } from "./RefreshTokenUserController";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

const refreshTokenRepository = new PostgresRefreshTokenRepository();

const generateTokenProvider = new GenerateTokenProvider();
const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();

const refreshTokenUserUseCase = new RefreshTokenUserUseCase(refreshTokenRepository, generateTokenProvider, generateRefreshTokenProvider);
const refreshTokenUserController = new RefreshTokenUserController(refreshTokenUserUseCase);

export { refreshTokenUserUseCase, refreshTokenUserController };