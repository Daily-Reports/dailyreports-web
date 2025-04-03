import Axios, {InternalAxiosRequestConfig} from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    const token = localStorage.getItem('token');

    if (config.headers) {
        config.headers.Accept = 'application/json';
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}

export const api = Axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
);