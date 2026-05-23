import { io } from 'socket.io-client'

const socketURL = import.meta.env.DEV 
    ? `http://${window.location.hostname}:3000` 
    : '/'

export const socket = io(socketURL, {
    autoConnect: true,
    reconnection: true
})