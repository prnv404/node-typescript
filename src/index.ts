import express, { Application } from 'express'
import mongoose from 'mongoose'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import Controller from '@/utils/interfaces/controller.interface'
import ErrorMiddleware from '@/middleware/error.middleware'

class App {
    public express: Application
    public port: number

    constructor(controllers: Controller[], port: number) {
        this.express = express()
        this.port = port
        this.initialseDatabaseConnection()
        this.initialiseMiddleware()
        this.initialiseControllers(controllers)
        this.initialiseErrorHandling()
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet())
        this.express.use(cors())
        this.express.use(morgan('dev'))
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: false }))
        this.express.use(compression())
    }

    private initialiseControllers(controller: Controller): void {
        controller.forEach((controller: Controller) => {
            this.express.use('api', controller.router)
        })
    }

    private initialseDatabaseConnection(): void {
        const { MONGO_URI } = process.env
        mongoose.connect(MONGO_URI)
    }

    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware())
    }
}

export default App
