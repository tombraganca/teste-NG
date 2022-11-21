import { createContext, useState, useEffect } from "react";

import { login } from "../services/AuthService";
import axiosInstance from "../services/AxiosInstance";
import { useNavigate } from 'react-router-dom'

interface IContext {
    authenticated: boolean;
    handleLogin: (props: { email: string; password: string }) => Promise<void>;
    handleLogout: () => void;
}

const Context = createContext({} as IContext);

function AuthProvider({ children }: any) {
    //const history = useNavigate()

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            axiosInstance.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin(props: { email: string; password: string }) {
        try {
            const { data } = await login(props);
            localStorage.setItem("token", JSON.stringify(data.token));
            axiosInstance.defaults.headers.Authorization = `Bearer ${data.token}`;
            setAuthenticated(true);

        } catch (error: any) {
            return Promise.reject(error.response.data);
        }
    }

    async function handleLogout() {
        localStorage.removeItem("token");
        setAuthenticated(false);
       // history('/login');
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin, handleLogout }}>{children}</Context.Provider>
    );
}

export { Context, AuthProvider };