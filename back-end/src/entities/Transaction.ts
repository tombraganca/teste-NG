import { v4 as uuid } from 'uuid';

export class Transaction {
    public readonly id!: string
    public readonly createdAt!: Date;

    public amount!: number;
    public details!: string
    public senderAccountId!: string
    public receivedAccountId!: string

    constructor(props: Omit<Transaction, 'id' | 'createdAt'>, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
            this.createdAt = new Date();
        }
    }
}