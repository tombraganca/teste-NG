import { createContext, useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import Loading from "../components/Loading";
import { Account } from "../entities/Account";
import { findAccountByEmail } from "../services/AccountService";

import { login } from "../services/AuthService";
import axiosInstance from "../services/AxiosInstance";
interface IContext {
    authenticated: boolean;
    userAccount: Account;
    setUserAccount: (account: Account) => void;
    handleLogin: (props: { email: string; password: string }) => Promise<void>;
    handleLogout: () => void;
}

const Context = createContext({} as IContext);

function AuthProvider({ children }: any) {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userAccount, setUserAccount] = useState({} as Account);

    useEffect(() => {

        try {

            const token = localStorage.getItem("token");
            if (localStorage.getItem("user")) {
                const user = JSON.parse(localStorage.getItem("user") as string);
                async function loadAccount() {
                    const { data } = await findAccountByEmail({ email: user.email });
                    const account = new Account(data);
                    setUserAccount(account);
                }
                loadAccount();
            }

            if (token) {
                axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
                setAuthenticated(true);
            }
        } catch (error) {
            console.warn(error);
        } finally {
            setLoading(false);
        }

    }, []);

    async function handleLogin(props: { email: string; password: string }) {
        try {
            const { data } = await login(props);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify({ ...data.user }));
            setUserAccount(data.user);
            localStorage.setItem("refreshToken", data.refreshToken);
            axiosInstance.defaults.headers.Authorization = `Bearer ${data.token}`;



            redirect("/home");
            setAuthenticated(true);

        } catch (error: any) {
            if (error.response.data)
                return Promise.reject(error.response.data);

            return Promise.reject(error);
        }
    }

    async function handleLogout() {
        localStorage.removeItem("token");
        axiosInstance.defaults.headers.Authorization = null;
        setAuthenticated(false);
    }


    if (loading) {
        return (
            <div className="w-screen h-screen flex justify-center content-center items-center">
                <Loading />
            </div>
        )
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin, handleLogout, userAccount, setUserAccount }}>{children}</Context.Provider>
    );
}

export { Context, AuthProvider };