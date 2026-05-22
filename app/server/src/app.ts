import express from 'express';
import cors from 'cors'
import path from 'path';
import churchServiceRouter from './routes/churchService.routes.js'
import churchAttendanceRouter from './routes/churchAttendance.routes.js'
import churchSectionRouter from './routes/churchSection.routes.js'
import csvExportRouter from './routes/csvExport.route.js'
import localIPRouter from './routes/serverIP.route.js'

const __dirname = path.dirname(__filename)

const app = express();

const isDev = process.env.NODE_ENV === 'development'

app.use((req, res, next) => {
  console.log('🔥 REQUEST HIT:', req.method, req.url)
  next()
})

// In dev allow Vite origin, in production allow everything
// since requests come from the same server
app.use(cors({
  origin:  isDev ? 'http://localhost:5173' : '*'
}));

app.use(express.json())

app.use('/api/network', localIPRouter)
app.use('/api/churchService', churchServiceRouter)
app.use('/api/churchAttendance', churchAttendanceRouter)
app.use('/api/churchSection', churchSectionRouter)
app.use('/api/exportCSV', csvExportRouter)

// Serve built React app in production
if(!isDev){
  const clientPath = path.join(__dirname, '..', '..', '..', '..', 'app', 'client', 'dist')

  // Serve static files
  app.use(express.static(clientPath))

  // Catch-all — let React Router handle all non-API routes
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'))
  })
}

export default app