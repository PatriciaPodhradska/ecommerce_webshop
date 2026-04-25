import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse, Axios } from 'axios';

interface RefreshTokenResponse {
    access: string;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = localStorage.getItem('access_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                try {
                    const response = await axios.post<RefreshTokenResponse>(
                        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/'}auth/token/refresh/`,
                        { refresh: refreshToken }
                    );
                    
                    localStorage.setItem('access_token', response.data.access);
                    
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                    }
                    return axiosClient(originalRequest);
                } catch (refreshError) {
                    // Redirect to login
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/account/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;