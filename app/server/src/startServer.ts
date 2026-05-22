import express from 'express'
import http from 'http'
import cors from 'cors'
import log from 'electron-log'

import churchServiceRouter from './routes/churchService.routes.js'
import churchAttendanceRouter from './routes/churchAttendance.routes.js'
import churchSectionRouter from './routes/churchSection.routes.js'
import csvExportRouter from './routes/csvExport.route.js'
import localIPRouter from './routes/serverIP.route.js'

export function startServer() {
  const app = express()
  const server = http.createServer(app)

  app.use(cors({ origin: '*' }))
  app.use(express.json())

  app.use('/api/network', localIPRouter)
  app.use('/api/churchService', churchServiceRouter)
  app.use('/api/churchAttendance', churchAttendanceRouter)
  app.use('/api/churchSection', churchSectionRouter)
  app.use('/api/exportCSV', csvExportRouter)

  server.listen(3000, () => {
    log.info('Server running on http://localhost:3000')
  })
}