import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { StudentRoutes } from './app/config/modules/student/student.route'
import { UserRoutes } from './app/config/modules/user/user.route'
import { globalErrorHandler, notFoundHandler } from './app/middlewares'
const app: Application = express()
app.use(express.json())
app.use(cors())

// application routes
app.use("/api/v1/students", StudentRoutes)
app.use("/api/v1/users", UserRoutes)



app.get('/', (req: Request, res: Response) => {
    res.send('Hello from server')
})

// global error handling middleware
app.use(globalErrorHandler)

// not found middleware
app.use(notFoundHandler)

export default app;