import http from 'http'
import { Server } from 'socket.io'
import log from 'electron-log'
import dotenv from 'dotenv'

// Load .env file
dotenv.config()

import app from './src/app.js'

const server = http.createServer(app)
const PORT = process.env.PORT || 8000

export function startServer() {
    console.log('SERVER ENTRY STARTED')

    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    })

    io.on('connection', (socket) => {
        log.info('Socket connected:', socket.id)
    })

    console.log('STARTING HTTP SERVER...')

    server.listen(PORT, () => {
        console.log(`SERVER RUNNING ON ${PORT}`)
        log.info(`Server running at http://localhost:${PORT}`)
    })
}

startServer()