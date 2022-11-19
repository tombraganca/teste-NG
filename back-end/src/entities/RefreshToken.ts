import { v4 as uuid } from 'uuid';

export class RefreshToken {
    public readonly id!: string;

    public expiresIn!: number;
    public userId!: string;

    constructor(props: Omit<RefreshToken, 'id'>, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
        }
    }
}