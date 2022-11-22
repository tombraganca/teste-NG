import { Notify } from "../../components/Notify";
import { getTransactions } from "../../services/TransactionService";

export function Dashboard() {

    async function handleTest() {
        try {

            const { data } = await getTransactions();
            Notify({ message: data.message, type: 'success' });
        } catch (error: any) {
            console.log(error)
            Notify({ message: error.response.data.message, type: 'error' });
        }
    }

    return (
        <>
            <header className="flex items-center mx-auto justify-center">
                <h1 className="text-white text-5xl font-bold">Welcome to your Digital Cart</h1>
            </header>

            <main className=" flex w-full items-center justify-center my-6">
                <section>
                    <div className="bg-zinc-800 px-36 py-12 flex flex-col items-center rounded-xl shadow-lg">
                        <h1 className="text-white text-3xl font-bold pb-5">Your balance:</h1>

                        <div>
                            <span className="text-white font-bold text-2xl">
                                R$ 100,00
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            className=" bg-zinc-800 px-8 py-4 mt-2 rounded-xl"
                            onClick={handleTest}
                        >
                            <span className="text-white">Transfer</span>
                        </button>
                        <button className=" bg-zinc-800 px-8 py-4 mt-2 rounded-xl">
                            <span className="text-white">Request</span>
                        </button>
                    </div>
                </section>

            </main>
        </>
    )
}