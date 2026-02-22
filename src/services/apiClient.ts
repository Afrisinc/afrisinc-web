import axios from 'axios';
import { logoutHandler } from '@/lib/authUtils';

const apiClient = () => {
    const token = localStorage.getItem("token");
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL
    });

    instance.interceptors.request.use(async (request) => {
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
    });

    instance.interceptors.response.use((response) => response, (error) => {
        // Handle explicit token errors
        const isTokenError =
            error?.response?.data?.error?.name === "TokenExpiredError" ||
            error?.response?.data?.error === "Token was not provided" ||
            error?.response?.data?.error?.message === "Token was not provided";

        const is401WithTokenMessage =
            error?.response?.status === 401 &&
            (error?.response?.data?.message?.toLowerCase()?.includes("token") ||
                error?.response?.data?.resp_msg?.toLowerCase()?.includes("token") ||
                (typeof error?.response?.data?.error === 'string' && error?.response?.data?.error?.toLowerCase()?.includes("token")));

        // Only logout on explicit authentication failures
        if (isTokenError || is401WithTokenMessage) {
            logoutHandler();
        }

        return Promise.reject(error);
    });

    return instance;
}

export default apiClient();