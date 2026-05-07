import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';

let io: Server

export function initSocket(httpServer: HTTPServer){
    io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log('Client connected', socket.id)

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id)
        })
    })

    return io
}

export const getIO = (): Server  => {
  if(!io) throw new Error('Socket.io not initialised')

  return io
}