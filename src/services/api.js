import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Token refresh interceptor
API.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config;
        if (
            err.response?.status === 401 &&
            !originalRequest._retry &&
            localStorage.getItem('refresh')
        ) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/token/refresh/`, {
                    refresh: localStorage.getItem('refresh')
                });
                localStorage.setItem('access', res.data.access);
                originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                return axios(originalRequest);
            } catch (e) {
                localStorage.clear();
                window.location.href = "/";
            }
        }
        return Promise.reject(err);
    }
);

export default API;
