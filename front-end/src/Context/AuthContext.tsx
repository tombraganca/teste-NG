import { createContext, useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import Loading from "../components/Loading";

import { login } from "../services/AuthService";
import axiosInstance from "../services/AxiosInstance";
interface IContext {
    authenticated: boolean;
    handleLogin: (props: { email: string; password: string }) => Promise<void>;
    handleLogout: () => void;
}

const Context = createContext({} as IContext);

function AuthProvider({ children }: any) {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin(props: { email: string; password: string }) {
        try {
            const { data } = await login(props);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("refreshToken", data.refreshToken);
            axiosInstance.defaults.headers.Authorization = `Bearer ${data.token}`;
            redirect("/home");
            setAuthenticated(true);

        } catch (error: any) {
            return Promise.reject(error.response.data);
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
        <Context.Provider value={{ authenticated, handleLogin, handleLogout }}>{children}</Context.Provider>
    );
}

export { Context, AuthProvider };