import express from 'express';
import churchServiceRouter from './routes/churchService.routes.js'

const app = express();

app.use((req, res, next) => {
  console.log('🔥 REQUEST HIT:', req.method, req.url)
  next()
})

app.use(express.json())

app.use('/api/churchService', churchServiceRouter)

export default app