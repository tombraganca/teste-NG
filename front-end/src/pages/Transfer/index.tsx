import { Check, CircleNotch } from "phosphor-react";
import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../../components/Loading";


import { Notify } from "../../components/Notify";
import { Context } from "../../Context/AuthContext";
import { findAccountByEmail } from "../../services/AccountService";
import { doTransfer } from "../../services/TransactionService";

interface IFormTransfer {
    received: string,
    balance: number;
    details: string;
}

export function Transfer() {

    const { userAccount } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<IFormTransfer>();

    function initTransfer() {
        console.log("Transfer");
    }

    async function onSubmit(formData: IFormTransfer) {
        try {
            setLoading(true);
            const { data } = await findAccountByEmail({ email: formData.received });
            if (!data) {
                Notify({ message: "Account not found", type: "error" });
                return;
            }
            console.log(userAccount)
            await doTransfer({
                amount: Number(formData.balance),
                details: formData.details,
                receivedAccountId: data.id,
                senderAccountId: userAccount.id
            });

            Notify({ message: "Transfer successfully", type: "success" });

        } catch (error: any) {
            Notify({ message: error.response.data.message, type: "error" });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => initTransfer(), [])

    return (<>
        <main className="flex text-center justify-center">
            <section className="w-1/2">
                <h1 className="text-white text-5xl font-bold mb-4" >New Transaction</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-800 p-8 flex flex-col justify-center text-center">
                    <input
                        className="w-full px-4 py-2 mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 bg-zinc-900 text-white"
                        {...register("received", {
                            required: "Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })}
                        type="email"
                        placeholder="Received" />
                    <div className="h-4">
                        {
                            errors.received &&
                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors.received.message}</span>
                        }
                    </div>
                    <input
                        className="w-full px-4 py-2 mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 bg-zinc-900 text-white"

                        {...register("balance", { required: "Required", min: { value: 0, message: "Value must be greater than zero" } })}
                        type="number"
                        step="any"
                        placeholder="0.00" />
                    <div className="h-4">
                        {
                            errors.balance &&
                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors.balance.message}</span>
                        }
                    </div>
                    <textarea
                        className="w-full px-4 py-2 mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 bg-zinc-900 text-white"

                        {...register("details")}
                        placeholder="Details" />
                    <div className="h-4">
                        {
                            errors.details &&
                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors.details.message}</span>
                        }
                    </div>

                    <button
                        type="submit"
                        className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded flex w-fit disabled:opacity-50"
                        disabled={loading}
                    >
                        <span className="flex">
                            {
                                loading ?
                                    (<>
                                        <CircleNotch size={24} color='white' className="animate-spin" /> Sending
                                    </>
                                    ) :
                                    (<>
                                        <Check size={24} weight="bold" color="white" className="mr-2" /> Send
                                    </>)
                            }
                        </span>

                    </button>

                </form>
            </section>
        </main>
    </>);
}