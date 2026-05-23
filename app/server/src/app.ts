import express from 'express'
import cors from 'cors'
import path from 'path'

import churchServiceRouter from './routes/churchService.routes.js'
import churchAttendanceRouter from './routes/churchAttendance.routes.js'
import churchSectionRouter from './routes/churchSection.routes.js'
import csvExportRouter from './routes/csvExport.route.js'
import localIPRouter from './routes/serverIP.route.js'

const app = express()
const isDev = process.env.NODE_ENV === 'development'|| process.env.RUN_SERVER_DIRECTLY === 'true'

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/api/network', localIPRouter)
app.use('/api/churchService', churchServiceRouter)
app.use('/api/churchAttendance', churchAttendanceRouter)
app.use('/api/churchSection', churchSectionRouter)
app.use('/api/exportCSV', csvExportRouter)

if (!isDev) {
    // Only resolve paths when actually needed in production
    const clientPath = path.resolve(
        process.cwd(),
        '../../client/dist'
    )

    app.use(express.static(clientPath))

    if (!isDev) {
        const clientPath = path.resolve(__dirname, '../../../client/dist')
        app.use(express.static(clientPath))
        app.get('/{*splat}', (req, res) => {
            res.sendFile(path.join(clientPath, 'index.html'))
    })
}
}

export default app