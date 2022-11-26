
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
    private users: User[] = [];

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);
        return user as User;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async findByUserId(userId: string): Promise<User> {
        const user = this.users.find(user => user.id === userId);
        return user as User;
    }
}
