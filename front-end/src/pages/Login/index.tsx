import { Fragment, useContext, useEffect, useState } from "react"
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "phosphor-react";

import { Notify } from "../../components/Notify";
import { Context } from "../../Context/AuthContext";
import { Transition, Dialog } from "@headlessui/react";
import { CreateAccountModal } from "./components/create-account-modal";

export function Login() {

    const navigate = useNavigate();

    const { authenticated, handleLogin } = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

    useEffect(() => {
        if (authenticated) {
            navigate('/home');
        }
    }, [authenticated]);

    async function handleSubmit() {

        if (!email || !password) {
            Notify({ message: 'Preencha todos os campos', type: 'error' });
            return;
        }

        try {
            setIsLoading(true);
            await handleLogin({ email, password });
        } catch (error: any) {
            console.log(error)
            Notify({ message: error.message, type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }

    function closeModal() {
        setShowCreateAccountModal(false)
    }

    function openModal() {
        setShowCreateAccountModal(true)
    }

    return (
        <section className={`flex flex-row w-screen ${showCreateAccountModal ? 'blur-sm' : ''}`}>
            <div className='flex bg-capa bg-cover bg-no-repeat h-screen w-2/5 max-md:hidden'>
            </div>

            <div className='flex justify-around content-center flex-col flex-auto'>
                <div className="flex items-center justify-center min-h-screen bg-zinc-900">
                    <div className="px-8 py-6 mt-4 text-left bg-zinc-800 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-center text-white">Bem vindo ao NG Cash</h3>

                        <dd className="text-zinc-400 text-center pt-1">
                            Faça Login para continuar
                        </dd>
                        <div className="flex justify-center content-center flex-col" >
                            <div className="mt-4">
                                <div>
                                    <label className="block text-white" htmlFor="email">Email</label>
                                    <input
                                        className="w-full px-4 py-2 mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 bg-zinc-900 text-white"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-white">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'password' : 'text'}
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="w-full px-4 py-2 pr-8 mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 bg-zinc-900 text-white"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pt-2">
                                            {
                                                showPassword ? (
                                                    <Eye size={24} color={'#ffffff'} onClick={() => setShowPassword(!showPassword)} />
                                                ) : (
                                                    <EyeSlash size={24} color={'#ffffff'} onClick={() => setShowPassword(!showPassword)} />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-around my-2">
                                    <button
                                        type="button"
                                        className="px-6 py-2 mt-4 text-white bg-violet-500 rounded-xl focus:outline-none w-52 hover:bg-violet-400 disabled:opacity-25"
                                        onClick={handleSubmit}
                                        disabled={isLoading || !email || !password}>
                                        {
                                            isLoading ? 'Carregando...' : 'Entrar'
                                        }
                                    </button>
                                </div>

                                <button
                                    onClick={openModal}
                                    className="text-sm text-zinc-200 hover:underline">
                                    Ainda não tem uma conta? Cadastre-se
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}