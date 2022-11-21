import { useContext, useEffect, useState } from "react"
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Notify } from "../../components/Notify";
import { Context } from "../../Context/AuthContext";

export function Login() {

    const navigate = useNavigate();

    const { authenticated, handleLogin } = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
    return (
        <section className='flex flex-row w-screen'>
            <div className='flex bg-capa bg-cover bg-no-repeat h-screen w-2/5 max-md:hidden'>
            </div>

            <div className='flex justify-around content-center flex-col flex-auto'>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                        <h3 className="text-2xl font-bold text-center">Bem vindo ao NG Cash</h3>

                        <dd className="text-zinc-400 text-center pt-1">
                            Faça Login para continuar
                        </dd>
                        <div >
                            <div className="mt-4">
                                <div>
                                    <label className="block" htmlFor="email">Email</label>
                                    <input
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block">Password</label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                    />
                                </div>
                                <div className="flex justify-around">
                                    <button
                                        type="button"
                                        className="px-6 py-2 mt-4 text-white bg-black rounded-xl focus:outline-none w-52 hover:bg-gray-800 disabled:opacity-25"
                                        onClick={handleSubmit}
                                        disabled={isLoading || !email || !password}>
                                            {
                                                isLoading ? 'Carregando...' : 'Entrar'
                                            }
                                            </button>
                                </div>

                                <a href="#" className="text-sm text-zinc-700 hover:underline">Ainda não tem uma conta? Cadastre-se</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </section>
    )
}