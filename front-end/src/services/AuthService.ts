import config from "../../environment.dev.json"
import axios from "axios";
import axiosInstance from "./AxiosInstance";

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    if (token) {
        return true;
    }

    return false;
}

export async function login(props: { email: string, password: string }) {
    return await axiosInstance.post(`login`, { email: props.email, password: props.password });
}

export async function createUser(props: { name: string, email: string, password: string }) {
    return await axiosInstance.post(`register`, props);
}

export async function refreshToken(props: { refreshToken: string }) {
    return await axiosInstance.post(`refresh-token`, props);
}