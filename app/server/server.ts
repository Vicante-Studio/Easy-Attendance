// app/server/server.ts

import http from 'http'
import { Server } from 'socket.io'
import log from 'electron-log'

import app from './src/app.js'
import { initSocket } from './src/sockets/socket.js'

export function startServer() {
  console.log('SERVER ENTRY STARTED')

  const server = http.createServer(app)

  initSocket(server)

  const PORT = 3000

  console.log('STARTING HTTP SERVER...')

  server.listen(PORT, () => {
    console.log(`SERVER RUNNING ON ${PORT}`)
    log.info(`Server running at http://localhost:${PORT}`)
  })
}

if (process.env.RUN_SERVER_DIRECTLY === 'true') {
    startServer()
}