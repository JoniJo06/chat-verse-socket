import express, {Request, Response} from "express";
import {createServer} from 'http'
import {Server} from 'socket.io'
import config from 'config'
import logger from './utils/logger'
import cors from 'cors'
import {version} from '../package.json'
import socket from "./socket";

const protocol = config.get<string>('protocol')
const host = config.get<string>('host');
const port = config.get<number>('port');
const corsOrigin = config.get<string>('corsOrigin')

const app = express()
const httpServer = createServer(app)
app.use(cors({origin: corsOrigin}))

const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true,
    }
})

app.get('/', (_: Request, res: Response) => {
    res.send('Server is up and running version ' + version)
})

httpServer.listen(port, host, () => {

    logger.info(`Server version ${version} is listen on port ${port}`)
    logger.info(`${protocol}://${host}:${port}`)

    socket({io})
})
