import axiosInstance from "./AxiosInstance";

interface ITransferDTO {
    receivedAccountId: string,
    senderAccountId: string,
    amount: number;
    details: string;
}

export async function getTransactions(data: { accountId: string }) {
    return await axiosInstance.get(`transfer/${data.accountId}`);
}

export async function doTransfer(data: ITransferDTO) {
    return await axiosInstance.post(`transfer`, data);
}