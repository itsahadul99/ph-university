import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { globalErrorHandler, notFoundHandler } from './app/middlewares'
import router from './app/routes'
const app: Application = express()
app.use(express.json())
app.use(cors())

// application routes

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from PH University server')
})

// global error handling middleware
app.use(globalErrorHandler)

// not found middleware
app.use(notFoundHandler)

export default app;