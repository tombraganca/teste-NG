import { v4 as uuid } from 'uuid';

export class Notification {
    public readonly id!: string;
    public readonly createdAt!: Date;
    
    public message!: string;
    public read!: boolean;
    public accountId!: string;

    constructor(props: Omit<Notification, 'id' | 'createdAt'>, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
            this.createdAt = new Date();
        }
    }
}