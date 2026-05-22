import { io } from 'socket.io-client'

const isDev = import.meta.env.DEV

export const socket = io(isDev ? 'http://localhost:8000': '/', {
    autoConnect: true,
    reconnection: true
})