import axiosInstance from "./AxiosInstance";

export async function getTransactions() {
    return await axiosInstance.get(`test`);
}