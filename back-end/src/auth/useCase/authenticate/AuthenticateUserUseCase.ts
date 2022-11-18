import { User } from "../../../entities/User";
import { ITokenProvider } from "../../../providers/ITokenProvider";
import { IUserRepository } from "../../repositories/IUserReposotory";
import { CreateUserRequestDTO } from "./AuthenticateUserDTO";

export class AuthenticateUserUseCase {
    constructor(private userRepository: IUserRepository, private tokenProvider: ITokenProvider) { }

    async execute(data: CreateUserRequestDTO) {

        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new Error('Email or password incorrect.');
        }
        const authUser = new User(user, user.id);

        const passwordMatch = await authUser.comparePassword(data.password);

        if (!passwordMatch) {
            throw new Error('Email or password incorrect.');
        }

        //jwt token
        const token = await this.tokenProvider.generateToken({ id: authUser.id });

        return { user: { id: authUser.id, name: authUser.name, email: authUser.email }, token };
    }
}