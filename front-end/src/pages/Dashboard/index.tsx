import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowClockwise } from "phosphor-react";

import { Context } from "../../Context/AuthContext";
import { findAccountByEmail } from "../../services/AccountService";
import { Account } from "../../entities/Account";
import { Notify } from "../../components/Notify";

export function Dashboard() {

    const [loadingAccount, setLoadingAccount] = useState(false);
    const { userAccount, setUserAccount } = useContext(Context);
    const navigate = useNavigate();

    function handleTransfer() {
        navigate("/transfer");
    }

    function handleRequest() {

    }

    async function handleRefresh() {

        try {
            setLoadingAccount(true);
            const { data } = await findAccountByEmail({ email: userAccount.email });
            setUserAccount(new Account(data));
            Notify({ message: 'Refreshed', type: "success" });

        } catch (error: any) {
            Notify({ message: error.response.data.message, type: "error" });
        } finally {
            setLoadingAccount(false);
        }
    }

    useEffect(() => {
        async function loadAccount() {
            const { data } = await findAccountByEmail({ email: userAccount.email });
            const account = new Account(data);
            setUserAccount(account);
        }
        loadAccount();
    }, []);

    return (
        <>
            <header className="flex items-center mx-auto justify-center">
                <h1 className="text-white text-5xl font-bold">Welcome to your Digital Cart</h1>
            </header>

            <main className=" flex w-full items-center justify-center my-6">
                <section>
                    <div className="bg-zinc-800 px-36 py-12 flex flex-col items-center rounded-xl shadow-lg">
                        <button
                            className="bg-zinc-700 px-4 py-2 mt-2 rounded-full hover:bg-zinc-600 transition duration-300"
                            onClick={handleRefresh}
                        >
                            {
                                loadingAccount ? <ArrowClockwise color='white' className="animate-spin" size={24} /> : <ArrowClockwise color='white' size={24} />
                            }
                        </button>
                        <h1 className="text-white text-3xl font-bold pb-5">Your balance:</h1>

                        <div>
                            <span className="text-white font-bold text-2xl">
                                {userAccount.getBalance}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            className=" bg-zinc-800 px-8 py-4 mt-2 rounded-xl hover:bg-zinc-700 transition duration-300"
                            onClick={handleTransfer}
                        >
                            <span className="text-white">Transfer</span>
                        </button>
                        <button
                            className=" bg-zinc-800 px-8 py-4 mt-2 rounded-xl hover:bg-zinc-700 transition duration-300"
                            onClick={handleRequest}>
                            <span className="text-white">Request</span>
                        </button>
                    </div>
                </section>

            </main>

        </>
    )
}