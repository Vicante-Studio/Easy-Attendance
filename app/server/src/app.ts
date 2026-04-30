import express from 'express';
import churchServiceRouter from './routes/churchService.routes.js'
import churchAttendanceRouter from './routes/churchAttendance.routes.js'
import churchSectionRouter from './routes/churchSection.routes.js'

const app = express();

app.use((req, res, next) => {
  console.log('🔥 REQUEST HIT:', req.method, req.url)
  next()
})

app.use(express.json())

app.use('/api/churchService', churchServiceRouter)
app.use('/api/churchAttendance', churchAttendanceRouter)
app.use('/api/churchSection', churchSectionRouter)

export default app