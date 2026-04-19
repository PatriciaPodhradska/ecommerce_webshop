import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api/', 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'withCredentials': true,
    }
});

export default axiosClient;