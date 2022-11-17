import { TokenTestProvider } from "../../test/providers-test/TokenTestProvider";
import { InMemoryUserRepository } from "../../test/repositories-test/InMemoryUserRepository";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


const userRepository = new InMemoryUserRepository();
const tokenTestProvider = new TokenTestProvider();

const authenticateUser = new AuthenticateUserUseCase(userRepository, tokenTestProvider);

const authenticateController = new AuthenticateUserController(authenticateUser);

export { authenticateUser, authenticateController };

