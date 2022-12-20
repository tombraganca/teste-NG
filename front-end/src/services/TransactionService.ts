import axiosInstance from "./AxiosInstance";

interface ITransferDTO {
    receivedAccountId: string,
    senderAccountId: string,
    amount: number;
    details: string;
}

export async function getTransactions() {
    return await axiosInstance.get(`test`);
}

export async function doTransfer(data: ITransferDTO) {
    return await axiosInstance.post(`transfer`, { ...data });
}