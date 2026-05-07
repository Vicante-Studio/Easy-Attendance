import dotenv from 'dotenv'
dotenv.config()

import { createServer } from 'http'

const PORT = process.env.PORT || 5000
import app from './src/app.js'
import { initSocket } from './src/sockets/socket.js'

// Wrap Express app in a raw HTTP server
const httpServer = createServer(app)

initSocket(httpServer)

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})