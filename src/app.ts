import express, { Application } from 'express'
import config from './config/config'

import morgan from 'morgan'
import cors from 'cors'
import { ErrorMiddleware } from './middlewares'

// Routes
import UserRoutes from './routes/user.routes'

class Server {
  private app: Application
  private port: string

  constructor() {
    this.app = express()
    this.port = config.PORT || '4000'
    this.settingMidlewares()
    this.settingRoutes()
    this.settingErrorHandler()
  }

  private settingMidlewares () {
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    const corsOptions = {
      origin: ['']
    }
    this.app.options('*', cors(corsOptions))
    this.app.use(cors(corsOptions))
  }

  private settingRoutes() {
    this.app.use('/user', UserRoutes)
  }

  private settingErrorHandler() {
    this.app.use(ErrorMiddleware)
  }

  public listen () {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`)
    })
  }
}

export default Server


