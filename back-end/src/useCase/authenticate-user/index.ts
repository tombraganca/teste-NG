
import { GenerateRefreshTokenProvider } from "../../providers/implementations/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../providers/implementations/GenerateTokenProvider";
import { PostgresUsersProvider } from "../../repositories/implementations/PostgresUserRepository";
import { PostgresRefreshTokenRepository } from "../../repositories/implementations/PostrgresRefreshTokenRepository";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


const userRepository = new PostgresUsersProvider();
const refreshTokenRepository = new PostgresRefreshTokenRepository();

const refreshTokenProvider = new GenerateRefreshTokenProvider();
const tokenProvider = new GenerateTokenProvider();

const authenticateUser = new AuthenticateUserUseCase(userRepository, refreshTokenRepository, refreshTokenProvider, tokenProvider);

const authenticateController = new AuthenticateUserController(authenticateUser);

export { authenticateUser, authenticateController };

