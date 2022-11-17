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

        const passwordMatch = await user.comparePassword(data.password);

        if (!passwordMatch) {
            throw new Error('Email or password incorrect.');
        }

        //jwt token
        const token = await this.tokenProvider.generateToken({ id: user.id });

        return { id: user.id, name: user.name, email: user.email, token };
    }
}