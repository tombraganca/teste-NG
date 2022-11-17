import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';


export class User {
    public readonly id!: string;
    public readonly createdAt!: Date;

    public name!: string;
    public email!: string;
    public password!: string;

    constructor(props: Omit<User, 'id' | 'createdAt' | 'comparePassword' | 'hashPassword'>, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
            this.createdAt = new Date();
        }
    }

    public comparePassword(password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, this.password, (err, same) => {
                if (err) {
                    reject(err);
                }

                resolve(same);
            });
        });
    }

    public async hashPassword(): Promise<void> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(this.password, 8, (err, hash) => {
                if (err) {
                    reject(err);
                }

                this.password = hash;

                resolve();
            });
        });
    }

}
