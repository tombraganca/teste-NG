import axios from "axios";
import environment from '../../environment.dev.json'

const axiosInstance = axios.create({
    baseURL: environment.BASE_URL_REQUEST,
})

axiosInstance.interceptors.request.use((config) => {
        return config;
})

export default axiosInstance