import axiosInstance from "./AxiosInstance";

export async function findAccountByEmail(props: { email: string }) {
    return await axiosInstance.get(`/account`, { params: props });
}