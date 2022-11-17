
import { User } from "../../../entities/User";
import { IMailProvider } from "../../../providers/IMailProvider";
import { TEMPLATE_EMAIL } from "../../../providers/configs/TempleteEmail";
import { IUserRepository } from "../../repositories/IUserReposotory";
import { CreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {

    constructor(
        private userRepository: IUserRepository,
        private mailProvider: IMailProvider
    ) { }

    async execute(data: CreateUserRequestDTO): Promise<void> {

        if (!this.emailValidate(data.email)) {
            throw new Error("Invalid email.");
        }

        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error('User already exists.');
        }

        const user = new User(data);

        await user.hashPassword();

        await this.userRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe NG Cash',
                email: 'ngCash@dev.com'
            },
            subject: 'Seja bem-vindo à plataforma',
            body: TEMPLATE_EMAIL
        });
    }

    private emailValidate(email: string): boolean {
        return email.includes('@');
    }
}