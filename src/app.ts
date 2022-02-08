import 'dotenv/config.js'
import express, {Request, Response} from "express";
import {createServer} from 'http'
import {Server} from 'socket.io'
import logger from './utils/logger'
import cors from 'cors'
import {version} from '../package.json'
import socket from "./socket";

// const host = process.env.HOST

const port = Number(process.env.PORT) || 4007

const app = express()
const httpServer = createServer(app)
app.use(cors({origin: process.env.ORIGIN_URL}))

const io = new Server(httpServer, {
    cors: {
        origin: process.env.ORIGIN_URL,
        credentials: true,
    }
})

app.get('/', (_: Request, res: Response) => {
    res.send('Server is up and running version ' + version)
})

httpServer.listen(port, () => {

    logger.info(`Server version ${version} is listen on port ${port}`)
    // logger.info(`${host}:${port}`)

    socket({io})
})
