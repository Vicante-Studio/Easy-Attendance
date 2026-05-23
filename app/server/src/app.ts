// app/server/src/app.ts
import express from 'express'
import cors from 'cors'

import churchServiceRouter from './routes/churchService.routes.js'
import churchAttendanceRouter from './routes/churchAttendance.routes.js'
import churchSectionRouter from './routes/churchSection.routes.js'
import csvExportRouter from './routes/csvExport.route.js'
import localIPRouter from './routes/serverIP.route.js'

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/api/network', localIPRouter)
app.use('/api/churchService', churchServiceRouter)
app.use('/api/churchAttendance', churchAttendanceRouter)
app.use('/api/churchSection', churchSectionRouter)
app.use('/api/exportCSV', csvExportRouter)

export default app