import { v4 as uuid } from 'uuid';


export class Account {

    public id!: string;
    public balance!: number
    public createdAt!: Date;
    public userId!: string;

    constructor(props: Omit<Account, 'id' | 'createdAt'>, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
            this.createdAt = new Date();
        }
    }

}