import http from 'http'
import { Server } from 'socket.io'
import app from './src/app.js'
import log from 'electron-log'

export function startServer() {
  const server = http.createServer(app)

  const io = new Server(server, {
    cors: { origin: '*' }
  })

  io.on('connection', (socket) => {
    log.info('Socket connected:', socket.id)
  })

  const PORT = 3000

  server.listen(PORT, () => {
    log.info(`Server running at http://localhost:${PORT}`)
  })
}