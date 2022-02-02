import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3002/',
    timeout: 3000
});

export default api;