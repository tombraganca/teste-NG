export class Account {

    public readonly id!: string;
    public readonly name!: string;
    public readonly email!: string;
    private balance!: number;

    public get getBalance() {
        return this.balance;
    }

    constructor(props: Partial<Account>) {
        Object.assign(this, props);
    }

    public updateBalance(value: number) {

        if (value < 0 && Math.abs(value) > this.balance) {
            throw new Error('Insufficient funds.');
        }

        if (value < 0 && Math.abs(value) <= this.balance) {
            throw new Error("You can't withdraw a negative value.");
        }

        this.balance += value;
    }

}