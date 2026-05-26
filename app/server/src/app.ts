import express from 'express'
import cors from 'cors'
import path from 'path'

import churchServiceRouter from './routes/churchService.routes.js'
import churchAttendanceRouter from './routes/churchAttendance.routes.js'
import churchSectionRouter from './routes/churchSection.routes.js'
import csvExportRouter from './routes/csvExport.route.js'
import localIPRouter from './routes/serverIP.route.js'

const app = express()
const isDev = process.env.NODE_ENV === 'development' || process.env.RUN_SERVER_DIRECTLY === 'true'

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Disposition'] // IMPORTANT for filename download
}))

app.use(express.json())

app.use('/api/network', localIPRouter)
app.use('/api/churchService', churchServiceRouter)
app.use('/api/churchAttendance', churchAttendanceRouter)
app.use('/api/churchSection', churchSectionRouter)
app.use('/api/exportCSV', csvExportRouter)

if (!isDev) {
    const clientPath = process.env.RESOURCES_PATH
        ? path.join(process.env.RESOURCES_PATH, 'app', 'client', 'dist')
        : path.join(process.cwd(), 'app', 'client', 'dist')

    app.use(express.static(clientPath))

    app.get('/{*splat}', (req, res) => {
        res.sendFile(path.join(clientPath, 'index.html'))
    })
}

export default app