import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { globalErrorHandler, notFoundHandler } from './app/middlewares'
import router from './app/routes'
import cookieParser from 'cookie-parser'
const app: Application = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    { origin: ['http://localhost:5000/'] }
))

/* The code `app.use('/api/v1', router)` is setting up a middleware in the Express application (`app`)
that will handle any requests that start with the path '/api/v1'. It will delegate the handling of
these requests to the `router` object, which contains the specific routes for this path. */
app.use('/api/v1', router)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from PH University server')
})
// global error handling middleware
app.use(globalErrorHandler)
// not found middleware
app.use(notFoundHandler)

export default app;