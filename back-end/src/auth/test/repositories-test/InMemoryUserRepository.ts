
import { User } from "../../../entities/User";
import { IUserRepository } from "../../repositories/IUserReposotory";

export class InMemoryUserRepository implements IUserRepository {
    private users: User[] = [];

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);
        return user as User;
    }

    async save(user: User): Promise<void> {
        console.log(user);
        this.users.push(user);
        console.log(this.users);
    }
}
