import { CircleNotch } from "phosphor-react";
import { useContext, useEffect, useState } from "react";


import { Context } from "../../Context/AuthContext";
import { getTransactions } from "../../services/TransactionService";
import { Card } from "./components/card";
import emptyImage from '../../assets/svg/empty.svg';
import { findAccountByEmail } from "../../services/AccountService";
import { Account } from "../../entities/Account";

interface ITransaction {
    id: string;
    type: 'sent' | 'received';
    details: string;
    amount: number;
    createdAt: Date;
    receivedAccount: { name: string, email: string };
    senderAccount: { name: string, email: string };

}

export function Transaction() {

    const { userAccount, setUserAccount } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    async function handleTransactions() {
        try {
            const { data } = await getTransactions({ accountId: userAccount.id });
            setTransactions(data);
        } catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        setLoading(true);
        handleTransactions().then(() => {
            setLoading(false);
        });
    }, []);


    return (
        <main className="flex text-center justify-center">
            <section className="w-1/2">
                <h1 className="text-white text-5xl font-bold mb-4" >My history</h1>

                <section className="bg-zinc-800 p-8 flex  justify-center text-center rounded-lg flex-col" >

                    {
                        loading ? <CircleNotch size={24} color='white' className="animate-spin" /> :
                            (
                                <div className="">
                                    {
                                        transactions?.length === 0 ? (

                                            <div className="flex flex-col justify-center items-center">
                                                <img src={emptyImage} alt="Empty" className="w-1/2" />
                                                <h1 className="text-white text-2xl font-bold mt-4" >No transactions</h1>
                                            </div>
                                        )
                                            :
                                            transactions.map((transaction: ITransaction) => {
                                                return (
                                                    <Card
                                                        key={transaction.id}
                                                        title={transaction.type === 'sent' ? transaction.receivedAccount.name : transaction.senderAccount.name}
                                                        description={transaction.details}
                                                        value={transaction.amount}
                                                        type={transaction.type}
                                                    />
                                                )
                                            })
                                    }
                                </div>
                            )

                    }


                </section>
            </section>
        </main>
    );
}