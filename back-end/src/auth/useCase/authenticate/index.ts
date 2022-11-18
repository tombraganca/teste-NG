import { JWTProvider } from "../../../providers/implementations/JWTProvider";
import { PostgresUsersProvider } from "../../repositories/implementations/PostgresUserRepository";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


const userRepository = new PostgresUsersProvider();
const tokenProvider = new JWTProvider();

const authenticateUser = new AuthenticateUserUseCase(userRepository, tokenProvider);

const authenticateController = new AuthenticateUserController(authenticateUser);

export { authenticateUser, authenticateController };

