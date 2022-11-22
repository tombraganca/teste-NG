import axios from "axios";
import { redirect } from "react-router-dom";
import environment from '../../environment.dev.json'

const axiosInstance = axios.create({
    baseURL: environment.BASE_URL_REQUEST,
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = { Authorization: `Bearer ${token}` }
    }
    return config;
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, async function (error) {
    try {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                const response = await axiosInstance.post(`refresh-token`, { refreshToken });
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    return axiosInstance(originalRequest);
                }
            } else {
                throw new Error('Refresh token not found');
            }
        }
    } catch (error) {
        console.log(error)
        localStorage.clear();
        window.location.reload();
    }

    return Promise.reject(error);
});


export default axiosInstance