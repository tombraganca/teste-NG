import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUser } from "../../../../services/AuthService";
import { Notify } from "../../../../components/Notify";
import Loading from "../../../../components/Loading";

interface IFormCreateAccount {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export function CreateAccountModal({ }: any) {

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormCreateAccount>();

    async function onSubmit(data: any): Promise<SubmitHandler<IFormCreateAccount>> {

        if (data.password !== data.confirmPassword) {
            Notify({ message: 'Passwords must be the same', type: 'error' });
            return data;
        }
        setIsLoading(true);
        try {
            await createUser(data);
            Notify({ message: 'Account created successfully', type: 'success' });           //await createUser(data);
        } catch (error: any) {
            if (error.response.data.message) {
                Notify({ message: error.response.data.message, type: 'error' });
                return data;
            }
            Notify({ message: error.message || 'An unexpected error occurred', type: 'error' });
        } finally {
            setIsLoading(false);
        }
        return data;
    }


    return (
        <>
            <main>
                <header>
                    <h3 className="text-2xl font-bold text-center text-white">
                        Create a new account
                    </h3>
                    <div className="mt-2">
                        <dd className="text-zinc-400 text-center pt-1">
                            We are happy that you want to be part of our family. Just tell us a few things and you can get started.
                        </dd>
                    </div>
                </header>

                <section className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label className="block text-white" htmlFor="name">Your name</label>
                        <input
                            className="w-full px-4 py-2 mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 bg-zinc-900 text-white"
                            type="text"
                            {...register('name', { required: "Required" })}
                            placeholder="John Doe"
                        />
                        {
                            errors.name && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors.name.message}</span>
                        }

                        <label className="block text-white mt-4" htmlFor="email">Your email</label>
                        <input
                            className="w-full px-4 py-2 mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 bg-zinc-900 text-white"
                            type="email"
                            {...register('email',
                                {
                                    required: "Required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "invalid email address"
                                    }
                                })
                            }
                            placeholder="example@test"
                        />
                        {errors.email &&
                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors.email.message}</span>
                        }

                        <label className="block text-white mt-4" htmlFor="email">Password</label>
                        <div className="relative">

                            <input
                                className="w-full px-4 py-2 mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 bg-zinc-900 text-white"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {
                                    required: "Required", minLength: {
                                        value: 8,
                                        message: "Your password must be at least 8 characters"
                                    }
                                })}
                                placeholder="Password"
                            />

                            {
                                errors.password &&
                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors.password.message}</span>
                            }
                            <button
                                className="absolute inset-y-0 right-0 flex items-center pr-2 pt-2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {
                                    showPassword ? (
                                        <Eye size={24} color={'#ffffff'} />
                                    ) : (
                                        <EyeSlash size={24} color={'#ffffff'} />
                                    )
                                }
                            </button>
                        </div>

                        <label className="block text-white mt-4" htmlFor="password">Enter your password again</label>
                        <input
                            className="w-full px-4 py-2 mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 bg-zinc-900 text-white"
                            type="password"
                            {...register('confirmPassword', {
                                required: "Required"
                            })}
                            placeholder="Password"
                        />

                        {
                            errors.confirmPassword &&
                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword.message}</span>
                        }

                        <button
                            className="px-6 py-2 mt-4 text-white bg-violet-500 rounded-xl focus:outline-none w-52 hover:bg-violet-400 disabled:opacity-25"

                            type="submit"
                            disabled={isLoading}
                        >
                            <span className="text-center flex justify-around">

                                {
                                    isLoading ? (
                                        <Loading size={8} />
                                    ) : (
                                        'Create account'
                                    )
                                }
                            </span>
                        </button>

                    </form>
                </section>
            </main>
        </>
    );
}