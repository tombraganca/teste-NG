import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewTransaction } from "./components/new-transaction/indedx";

export function Dashboard() {
    const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
    const navigate = useNavigate();

    function closeModal() {
        setShowNewTransactionModal(false)
    }

    function openModal() {
        setShowNewTransactionModal(true)
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
                            onClick={() => { openModal() }}
                        >
                            <span className="text-white">Transfer</span>
                        </button>
                        <button className=" bg-zinc-800 px-8 py-4 mt-2 rounded-xl">
                            <span className="text-white">Request</span>
                        </button>
                    </div>
                </section>

            </main>

            <Transition appear show={showNewTransactionModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all">
                                    <NewTransaction />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}