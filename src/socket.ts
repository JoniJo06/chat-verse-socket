import {Server, Socket} from "socket.io"
import logger from "./utils/logger";
import {EVENTS} from "./enums";
import { nanoid } from 'nanoid';

interface client {
    user_id: string
    client_id:string
}

const clients:client[] = []
const rooms: Record<string, {name: string}> = {}

const socket = ({io}: {io: Server}) => {
    logger.info('sockets enables')

    io.on(EVENTS.CONNECTION , (socket: Socket) => {
        const {user_id} = socket.handshake.query

        const clientInfo: client = {
            user_id: String(user_id),
            client_id: socket.id
        }
        clients.push(clientInfo)
        logger.info('user connected ' + user_id)

        socket.on(EVENTS.CLIENT.CREATE_ROOM, (chat_id:string, user_id:string) => {
            const exist:boolean = chat_id in rooms
            if(exist){
            logger.info('create')
                socket.join(chat_id)
                // logger.info(socket)
                socket.to(chat_id).emit(EVENTS.SERVER.JOINED_ROOM, chat_id)
                logger.info(rooms)
            } else {
                const roomId = nanoid()
                rooms[roomId] = {
                    name: chat_id
                }

                socket.join(chat_id)
                socket.emit(EVENTS.SERVER.JOINED_ROOM, chat_id)
            }
        })

        interface SingleMessageType{
            message: string;
            chat_id: string;
            creator: string;
            timestamp: number;
            read_status: boolean;
        }

        socket.on(EVENTS.CLIENT.SEND_SINGLE_MESSAGE, ({message, chat_id,creator, timestamp, read_status} : SingleMessageType) =>{
            // logger.info('hi')
            // logger.warn(rooms[chat_id])
            // const twoMember:boolean = rooms[chat_id].member.length === 2 || true
            socket.to(chat_id).emit(EVENTS.SERVER.RECEIVE_SINGLE_MESSAGE, {
                message,
                chat_id,
                creator,
                timestamp,
                 read_status
            })
        })

        socket.on(EVENTS.CLIENT.DISCONNECT, () => {
            for (let i = 0, len = clients.length; i < len; ++i) {
                const c = clients[i];
                if (c.client_id == socket.id) {
                    clients.splice(i, 1);
                    break;
                }
            }
            // for (const key in rooms){
            //     const value = rooms[key];
            //     const i = value.member.indexOf(String(user_id))
            //     if(i !== undefined){
            //         value.member.splice(i, 1);
            //         break
            //     }
            // }
        })

    })
}

export default socket