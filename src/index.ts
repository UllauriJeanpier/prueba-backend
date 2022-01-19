import dotenv from 'dotenv'
import 'reflect-metadata'
import Server from './app'
import { createConnection } from 'typeorm'

dotenv.config()

const server = new Server()

async function startServer() {
  createConnection()
  server.listen()
}

startServer()