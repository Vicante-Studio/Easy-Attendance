import axios from 'axios';

const isDev = import.meta.env.DEV

export const api = axios.create({
    baseURL: isDev ? 'http://localhost:3000' : ''
})